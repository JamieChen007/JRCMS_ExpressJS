function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  it('should return correct sum of two numbers', () => {
    //setup(init,mock)
    //execute
    const result = sum(1, 2);
    //compare
    expect(result).toBe(3);
  });
});
