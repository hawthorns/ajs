namespace test {

  export function expected(expected : any, found :any, message: string) : void {
    if (expected === found) {
      throw new Error(message);
    }
  }

}
