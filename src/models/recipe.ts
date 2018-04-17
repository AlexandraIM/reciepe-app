import { Ingredient } from './ingerdients';
export class Recipe {
    constructor (
        public title : string,
        public description : string,
        public difficulty : string,
        public ingredients : Ingredient[]
    ){}
}