export class User{
    private _email : string
    private _password : string
    private _name : string
    private _male : boolean
    private _image : string
    private _birthDate : Date
    constructor(email:string, password:string, name : string, male : boolean, birthDate : Date){
        this._email = email;
        this._password = password;
        this._name = name;
        this._male = male;
        this._image = male ? 'https://clipart-library.com/2023/male-clipart-md.png' : 'https://clipart-library.com/2023/350-3508951_big-image-faceless-woman-clipart.png';
        this._birthDate = birthDate;
    }
    get email(): string {
        return this._email;
      }
    
      set email(email: string) {
        this._email = email;
      }
    get password() : string{
        return this._password
    }
    set password(password:string){
        this._password = password
    }
    get name() : string{
        return this._name
    }
    set name(name:string){
        this._name = name
    }
    get image() : string{
        return this._image
    }
    set image(image:string){
        this._image = image
    }
    get male() : boolean{
        return this._male
    }
    set male(male:boolean){
        this._male = male
    }
    get birthDate() : Date{
        return this._birthDate
    }
    set birthDate(birthDate: Date){
        this._birthDate = birthDate
    }
}