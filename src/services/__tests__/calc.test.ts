import { division, multiplication, subtraction, sum } from './calculing';

describe('Calculing service', () => {
  test('should sum 2 numbers and return its result', () => {
    const n = 10;
    const y = 10;
    const response = sum(n, y);
    console.log(response);
    expect(response).toEqual(20);
  });
  test('should divide 2 numbers and return its result', () => {
    const n = 100;
    const y = 10;
    const response = division(n, y);
    console.log(response);
    expect(response).toEqual(10);
  });
  test('should subtract 2 numbers and return its result', () => {
    const n = 100;
    const y = 10;
    const response = subtraction(n, y);
    console.log(response);
    expect(response).toEqual(90);
  });
  test('should mutiplay 2 numbers and return its result', () => {
    const n = 10;
    const y = 10;
    const response = multiplication(n, y);
    console.log(response);
    expect(response).toEqual(100);
  });
});
