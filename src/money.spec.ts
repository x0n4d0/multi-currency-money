import { Bank } from './bank';
import { Expression } from './expression';
import { Money } from './money';
import { Sum } from './sum';

describe('Money', () => {
  test('should handle money multiplication', () => {
    const dollar: Money = Money.dollar(5)

    expect(dollar.times(2)).toEqual(Money.dollar(10))
    expect(dollar.times(3)).toEqual(Money.dollar(15))
  })

  test('should handle money equality', () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()
    expect(Money.euro(5).equals(Money.dollar(5))).toBeFalsy()
  })

  test('should handle curriencies', () => {
    expect(Money.dollar(1).currency).toEqual('USD')
    expect(Money.euro(1).currency).toEqual('EUR')
  })

  test('should handle simple addition', () => {
    const fiveDollars = Money.dollar(5)
    const sum: Expression = fiveDollars.plus(fiveDollars)
    const bank = new Bank()
    const reduced: Money = bank.reduce(sum, 'USD')
    expect(reduced.equals(Money.dollar(10))).toBeTruthy()
  })

  test('should return a sum when plus is used', () => {
    const fiveDollars = Money.dollar(5)
    const result: Expression = fiveDollars.plus(fiveDollars)
    const sum = result as Sum
    expect(sum.augend).toEqual(fiveDollars)
    expect(sum.addend).toEqual(fiveDollars)
  })

  test('should reduce from a sum', () => {
    const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4))
    const bank = new Bank()
    const result = bank.reduce(sum, 'USD')
    expect(result).toEqual(Money.dollar(7))
  })

  test('should reduce from a money', () => {
    const bank = new Bank()
    const result: Money = bank.reduce(Money.dollar(1), 'USD')
    expect(result).toEqual(Money.dollar(1))
  })

  test('should reduce from different currencies', () => {
    const bank = new Bank()
    bank.addRate('EUR', 'USD', 2)
    const result = bank.reduce(Money.euro(2), 'USD')
    expect(result).toEqual(Money.dollar(1))
  })

  test('should handle identity rate', () => {
    expect(new Bank().rate('USD', 'USD')).toEqual(1)
  })

  test('should handle mixed addition', () => {
    const fiveBucks: Expression = Money.dollar(5)
    const tenEuros: Expression = Money.euro(10)
    const bank = new Bank()
    bank.addRate('EUR', 'USD', 2)
    const result = bank.reduce(fiveBucks.plus(tenEuros), 'USD')
    expect(result).toEqual(Money.dollar(10))
  })

  test('should handle the plus operation in a sum', () => {
    const fiveBucks: Expression = Money.dollar(5)
    const tenEuros: Expression = Money.euro(10)
    const bank = new Bank()
    bank.addRate('EUR', 'USD', 2)
    const sum: Expression = new Sum(fiveBucks, tenEuros).plus(fiveBucks)
    const result: Money = bank.reduce(sum, 'USD')
    expect(result).toEqual(Money.dollar(15))
  })

  test('should handle the times operation in a sum', () => {
    const fiveBucks: Expression = Money.dollar(5)
    const tenEuros: Expression = Money.euro(10)
    const bank = new Bank()
    bank.addRate('EUR', 'USD', 2)
    const sum: Expression = new Sum(fiveBucks, tenEuros).times(2)
    const result: Money = bank.reduce(sum, 'USD')
    expect(result).toEqual(Money.dollar(20))
  })
})