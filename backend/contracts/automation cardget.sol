// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract a {
    uint8[51] public numbers = [
        26, 3, 47, 18, 50, 12, 1, 21, 8, 14, 33, 29, 35, 4, 43, 17, 5, 20, 39, 32, 
        6, 25, 16, 27, 7, 46, 13, 49, 31, 11, 2, 48, 19, 22, 38, 9, 45, 40, 24, 10, 
        37, 23, 15, 51, 30, 41, 36, 34, 28, 44, 42
    ];

    uint8[17] public array1;
    uint8[17] public array2;
    uint8[17] public array3;

    function swapper() public {
        // Perform some shifting and swapping
        for (uint8 i = 0; i < 25; i++) {
            uint8 temp = numbers[i];
            numbers[i] = numbers[50 - i];
            numbers[50 - i] = temp;
        }

        for (uint8 i = 0; i < 50; i += 2) {
            uint8 temp = numbers[i];
            numbers[i] = numbers[i + 1];
            numbers[i + 1] = temp;
        }

        // Divide the array into three separate arrays
        for (uint8 i = 0; i < 17; i++) {
            array1[i] = numbers[i];
            array2[i] = numbers[i + 17];
            array3[i] = numbers[i + 34];
        }
    }

    // Helper functions to retrieve arrays for verification
    function getArray1() public view returns (uint8[17] memory) {
        return array1;
    }

    function getArray2() public view returns (uint8[17] memory) {
        return array2;
    }

    function getArray3() public view returns (uint8[17] memory) {
        return array3;
    }
}
