import { calculateValueOfPercentage } from 'src/utils/logic/home/calculateTurnaroundWidthElement';

const functionToTest = (value, percentage) => {
  return calculateValueOfPercentage(value, percentage);
}

describe('Testing calculateValueOfPercentage function', () => {
  it('tests with correct value', () => {
    expect(functionToTest(3, 0.33)).toEqual(0.99);
  });

  it('tests with negative value', () => {
    expect(functionToTest(-23, 0,.33)).toEqual(null);
  });
  
  it('tests with null values', () => {
    expect(functionToTest(null, 0.20)).toEqual(null);
  });

});
