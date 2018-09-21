class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string,
    public lastName: string) {
      this.fullName = firstName+ " " + middleInitial + " " + lastName;
    }
}
interface Person {
  firstName: string;
  lastName: string;
}
function greeter(person: Student) {
  // return "hello, " + person.firstName + " " + person.lastName;
  return "Hello, " + person.fullName;
}

// let user = "Oh my god"
// let user = [2,3,4]
// let user = {firstName: "Jane", lastName: "Kotlin"}
let user = new Student("Janes", "M.", "User")

document.body.innerHTML = greeter(user)
