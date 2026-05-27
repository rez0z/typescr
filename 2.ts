abstract class Shape {
    protected abstract getDescription(): string;
    abstract getArea(): number;
    abstract getPerimeter(): number;
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    protected getDescription(): string {
        return `Circle with radius ${this.radius}`;
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }

    protected getDescription(): string {
        return `Rectangle with width ${this.width} and height ${this.height}`;
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

class Triangle extends Shape {
    constructor(private sideA: number, private sideB: number, private sideC: number) {
        super();
    }

    protected getDescription(): string {
        return `Triangle with sides ${this.sideA}, ${this.sideB}, ${this.sideC}`;
    }

    getArea(): number {
        const s = this.getPerimeter() / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    getPerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }
}

class CompoundShape extends Shape {
    private shapes: Shape[] = [];

    constructor(shapes: Shape[] = []) {
        super();
        this.shapes = shapes;
    }

    addShape(shape: Shape): void {
        this.shapes.push(shape);
    }

    protected getDescription(): string {
        return `Compound shape containing ${this.shapes.length} shapes`;
    }

    getArea(): number {
        return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
    }

    getPerimeter(): number {
        return this.shapes.reduce((total, shape) => total + shape.getPerimeter(), 0);
    }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const triangle = new Triangle(3, 4, 5);

const compound = new CompoundShape([circle, rectangle]);
compound.addShape(triangle);

console.log(`Circle area: ${circle.getArea()}, perimeter: ${circle.getPerimeter()}`);
console.log(`Rectangle area: ${rectangle.getArea()}, perimeter: ${rectangle.getPerimeter()}`);
console.log(`Triangle area: ${triangle.getArea()}, perimeter: ${triangle.getPerimeter()}`);
console.log(`Compound area: ${compound.getArea()}, perimeter: ${compound.getPerimeter()}`);