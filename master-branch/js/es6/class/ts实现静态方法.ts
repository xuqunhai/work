interface MyType {
    instanceMethod(): void;
}

interface MyTypeStatic {
    new(): MyType;
    staticMethod(): void;
}

function staticImplements<T>() {
    return <T>(constuctor: T) => constuctor
}

@staticImplements<MyTypeStatic>()
class JingChengYd {
    instanceMethod() { }
    static staticMethod() { }
}
JingChengYd.staticMethod();

// 上面编译后
/*
interface Config {
    readonly NAME: string;
    readonly TITLE: string;
}

interface Configconstructor {
    coreInstance: void;
    new(): Config;
}

class Test implements Configconstructor {
    coreInstance: void;
    NAME: string;
    TITLE: string;
    static coreInstance() { };
}
*/

abstract class A {
    static fn() {
        throw new Error()
    }
    abstract test(): void;
}
class B extends A {
    static fn() {
        console.log()
    }
    test() { }
}
console.log(B.fn())