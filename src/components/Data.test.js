import { initialItems } from './Data.js';

const numItems = initialItems.length;

describe('Number test',()=>{
    test('Number of items = 2', () => {
        expect(numItems).toBe(2); // Ensure this matches your actual pizza data
    });
      
    test('Number of items to be greater than or equal to 2', () => {
        expect(numItems).toBeGreaterThanOrEqual(2);
    });
})

const dataTest = initialItems[0].description;

describe('String tests', ()=>{
    test('There is a JS in this title', () => {
        expect(dataTest).toMatch(/JS/); // Ensure this matches your actual pizza data
    });
    
    test('This title contains REact', () => {
        expect(dataTest).toContain('Angular'); // Ensure this matches your actual pizza data
    });
    
    test('This title contains Shirt', () => {
        expect(dataTest).toContain('Shirt'); // Ensure this matches your actual pizza data
    });
})

//arrays & objects
const data2 = ['React Native','React'];

describe('Arrays and object tests',()=>{
    test('The list of courses contains React Native and React', () => {
        expect(['React Native', 'React', 'MeteorJS']).toEqual(expect.arrayContaining(data2));
    });
    
    test('The first course to have a property title', () => {
        expect(initialItems[0]).toHaveProperty('description');
    });
    
    test('The first course to have a property title and value of Shirt', () => {
        expect(initialItems[0]).toHaveProperty('description','Shirt');
    });
})
