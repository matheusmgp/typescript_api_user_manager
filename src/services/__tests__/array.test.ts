import { charAt, replaceString, splitString, splitStringAndJoin } from './arrays-strings';

describe('Array and String service', () => {
  test('should return a array with two positions', () => {
    const value = 'matheus gustavo';
    const response = splitString(value);
    console.log(response);
    expect(response).toEqual(['matheus', 'gustavo']);
  });
  test('should return a string with a dot in the middle', () => {
    const value = 'matheus gustavo';
    const response = splitStringAndJoin(value);
    console.log(response);
    expect(response).toEqual('matheus.gustavo');
  });
  test('should replace the first 4 letters from the word ', () => {
    const value = 'matheus';
    const response = replaceString(value);
    console.log(response);
    expect(response).toEqual('gusteus');
  });
  test('should return the letter in position 3 ', () => {
    const value = 'matheus';
    const response = charAt(value);
    console.log(response);
    expect(response).toEqual('h');
  });
});
