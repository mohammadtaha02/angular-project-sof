export class User {
    email: string;
    password: string;
    name: string;
    male: boolean;
    image: string;
    birthDate: Date;
    is_admin: boolean;

    constructor(email: string, password: string, name: string, male: boolean, birthDate: Date, is_admin: boolean) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.male = male == true;
        if(this.male){
            this.image ='https://clipart-library.com/2023/male-clipart-md.png'
        }
        else{
            this.image ='https://clipart-library.com/2023/350-3508951_big-image-faceless-woman-clipart.png';
        }
        this.birthDate = birthDate;
        this.is_admin = is_admin;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string) {
        this.image = image;
    }

    getMale(): boolean {
        return this.male;
    }

    setMale(male: boolean) {
        this.male = male;
    }

    getBirthDate(): Date {
        return this.birthDate;
    }

    setBirthDate(birthDate: Date) {
        this.birthDate = birthDate;
    }

    getIsAdmin(): boolean {
        return this.is_admin;
    }

    setIsAdmin(is_admin: boolean) {
        this.is_admin = is_admin;
    }
}
