// Statement:
// Provide 3 unique implementations of the following function in TypeScript.
// - Comment on the complexity or efficiency of each function.
// **Input**: `n` - any integer
// Output: return - summation to n, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.


// First way: Iterative approach
// Time complexity: O(n)
// Space complexity: O(1)
function sum_to_n_a_1(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Second way: Recursive approach
// Time complexity: O(n)
// Space complexity: O(n)
function sum_to_n_a_2(n: number): number {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_a_2(n - 1);
}

// Third way: Using formula
// Time complexity: O(1)
// Space complexity: O(1)
function sum_to_n_a_3(n: number): number {
    return n * (n + 1) / 2;
}

// Test cases
console.log(sum_to_n_a_1(5)); // 15
console.log(sum_to_n_a_2(5)); // 15
console.log(sum_to_n_a_3(5)); // 15