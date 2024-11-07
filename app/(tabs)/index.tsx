import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CalculatorApp: React.FC = () => {
  const [result, setResult] = useState<string>("0");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");

  const handleNumber = (num: string) => {
    if (num === "." && currentValue.includes(".")) return; // Prevent multiple decimals
    const newValue =
      currentValue === "0" && num !== "." ? num : currentValue + num;
    setCurrentValue(newValue);
    setResult(operation ? `${result} ${newValue}` : newValue);
  };

  const handleOperation = (op: string) => {
    if (operation && currentValue) {
      handleEquals();
    }
    setOperation(op);
    setResult(`${result} ${op}`);
    setCurrentValue("");
  };

  const handleEquals = () => {
    if (!operation || !currentValue) return;

    const num1 = parseFloat(result);
    const num2 = parseFloat(currentValue);
    let resultValue: number;

    switch (operation) {
      case "+":
        resultValue = num1 + num2;
        break;
      case "-":
        resultValue = num1 - num2;
        break;
      case "*":
        resultValue = num1 * num2;
        break;
      case "/":
        resultValue = num2 === 0 ? 0 : num1 / num2;
        break;
      default:
        return;
    }

    setResult(resultValue.toString());
    setCurrentValue("");
    setOperation("");
  };

  const handleClear = () => {
    setResult("0");
    setCurrentValue("");
    setOperation("");
  };

  const handleSquareRoot = () => {
    const value = parseFloat(currentValue || result);
    const resultValue = Math.sqrt(value);
    setCurrentValue(resultValue.toString());
    setResult(resultValue.toString());
    setOperation("");
  };

  const handleToggleSign = () => {
    const toggledValue = currentValue.startsWith("-")
      ? currentValue.slice(1)
      : `-${currentValue}`;
    setCurrentValue(toggledValue);
    setResult(toggledValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{result}</Text>
        </View>
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
          >
            <Text style={[styles.buttonText, styles.clearButtonText]}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={handleSquareRoot}
          >
            <Text style={styles.OperationButtonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={handleToggleSign}
          >
            <Text style={styles.OperationButtonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperation("/")}
          >
            <Text style={styles.OperationButtonText}>÷</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperation("*")}
          >
            <Text style={styles.OperationButtonText}>×</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperation("-")}
          >
            <Text style={styles.OperationButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperation("+")}
          >
            <Text style={styles.OperationButtonText}>+</Text>
          </TouchableOpacity>

          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map(
            (value) => (
              <TouchableOpacity
                key={value}
                style={[styles.button]}
                onPress={() => handleNumber(value)}
              >
                <Text style={styles.buttonText}>{value}</Text>
              </TouchableOpacity>
            )
          )}

          <TouchableOpacity
            style={[styles.button, styles.equalsButton]}
            onPress={handleEquals}
          >
            <Text style={styles.equalsButtonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  calculator: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: "#ffff",
    borderRadius: 8,
  },
  result: {
    fontSize: 48,
    fontWeight: "600",
    color: "#140202",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    margin: 4,
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clearButton: {
    backgroundColor: "#FF6B6B",
  },
  operationButton: {
    backgroundColor: "#640d0d",
  },
  equalsButton: {
    backgroundColor: "#4B6587",
    width: "46%",
  },
  buttonText: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "600",
  },
  OperationButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  clearButtonText: {
    color: "#FFFFFF",
  },
  equalsButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
});

export default CalculatorApp;
