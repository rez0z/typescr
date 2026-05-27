
type Facultative = 'Computer Science' | 'Mathematics' | 'Physics' | 'Engineering';

type Student = {
    name: string;
    age: number;
    facultative: Facultative;
}

const student1: Student = {
    name: 'Иван Петров',
    age: 20,
    facultative: 'Computer Science'
};

const student2: Student = {
    name: 'Мария Сидорова',
    age: 22,
    facultative: 'Mathematics'
};