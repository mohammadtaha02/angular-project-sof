export class User{
    private email : string
    private password : string
    private name : string
    private male : boolean
    private image : string
    constructor(email:string, password:string, name : string, male : boolean){
        this.email = email
        this.password = password
        this.name = name
        this.male = male
        if(male){
            this.image = 'https://clipart-library.com/2023/male-clipart-md.png'
        }
        else{
            this.image = 'https://clipart-library.com/2023/350-3508951_big-image-faceless-woman-clipart.png'
        }
    }
    getEmail(){
        return this.email
    }
    setEmail(email:string){
        this.email = email
    }
    getPassword(){
        return this.password
    }
    setPassword(password:string){
        this.password = password
    }
    getName(){
        return this.name
    }
    setName(name:string){
        this.name = name
    }
    getImage(){
        return this.image
    }
    setImage(image:string){
        this.image = image
    }
}