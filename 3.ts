type Discount = 
    | { kind: "percent"; value: number }
    | { kind: "fixed"; valueRub: number };

interface CartLine {
    getPrice(): number;
    getTotal(): number;
}

class ProductLine implements CartLine {
    constructor(private price: number, private quantity: number) {}

    getPrice(): number {
        return this.price;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }
}

class PartLine implements CartLine {
    constructor(private price: number, private quantity: number, private taxRate: number) {}

    getPrice(): number {
        return this.price;
    }

    getTotal(): number {
        const baseTotal = this.price * this.quantity;
        return baseTotal + baseTotal * (this.taxRate / 100);
    }
}

type CustomerType = "individual" | "company";

interface Payment {
    process(amount: number): void;
}

class BankTransferPayment implements Payment {
    constructor(private customerType: CustomerType) {}

    process(amount: number): void {
        if (this.customerType !== "company") {
            throw new Error("Bank transfer is allowed only for companies");
        }
        console.log(`Processing bank transfer for ${amount} rub`);
    }
}

class CartCalculator {
    private lines: CartLine[] = [];
    private discount: Discount | null = null;

    addLine(line: CartLine): void {
        this.lines.push(line);
    }

    setDiscount(discount: Discount): void {
        this.discount = discount;
    }

    getSubtotal(): number {
        let total = 0;
        for (const line of this.lines) {
            total += line.getTotal();
        }
        return total;
    }

    getTotal(): number {
        let total = this.getSubtotal();

        if (this.discount) {
            if (this.discount.kind === "percent") {
                total = total - (total * this.discount.value / 100);
            } else if (this.discount.kind === "fixed") {
                total = total - this.discount.valueRub;
                if (total < 0) total = 0;
            }
        }

        return total;
    }
}

const calculator = new CartCalculator();

calculator.addLine(new ProductLine(100, 2));
calculator.addLine(new PartLine(500, 1, 20));

console.log("Subtotal:", calculator.getSubtotal());

calculator.setDiscount({ kind: "percent", value: 10 });
console.log("With 10% discount:", calculator.getTotal());

calculator.setDiscount({ kind: "fixed", valueRub: 300 });
console.log("With 300 rub discount:", calculator.getTotal());

const payment = new BankTransferPayment("company");
payment.process(calculator.getTotal());
