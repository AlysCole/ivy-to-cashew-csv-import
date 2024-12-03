/** @OnlyCurrentDoc */
function convertExpenses() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const typeColumn = sheet.getRange("G:G");
    const typeValues = typeColumn.getValues();
    const amountColumn = sheet.getRange("E:E");

    for (let i = 0; i < typeValues?.length; i++) {
      if (typeValues[i][0] === "EXPENSE") {
        const cell = amountColumn.getCell(i + 1, 1);
        const cellValue = cell.getValue();

        // Set expenses by making values negative
        cell.setValue(-cellValue);
      }
    }
}

function convertTransfers() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const textFinder = sheet.createTextFinder('TRANSFER').matchEntireCell(true).matchCase(true);

  let currentTransferRow = textFinder.findNext();
  while (!!currentTransferRow) {
    const typeColumn = sheet.getRange("G:G");
    const i = currentTransferRow.getRowIndex();
    const row = sheet.getRange(i + ":" + i);
    const rowValues = row.getValues();

    // Expense Row
    sheet.insertRowAfter(i);
    // Income Row
    sheet.insertRowAfter(i + 1);
    sheet.deleteRow(i);

    const expenseRow = sheet.getRange((i) + ":" + (i));
    const incomeRow = sheet.getRange((i + 1) + ":" + (i + 1));
    expenseRow.setValues(rowValues);
    incomeRow.setValues(rowValues);

    // Set the expense row amount to the negative transfer amount 
    const transferAmount = rowValues[0][7];
    expenseRow.getCell(1, 5).setValue(-transferAmount);
    expenseRow.getCell(1, 7).setValue("EXPENSE");
    expenseRow.getCell(1, 3).setValue("Transfer");
    
    // Set the income row amount to the transfer amount
    incomeRow.getCell(1, 5).setValue(transferAmount);
    incomeRow.getCell(1, 7).setValue("INCOME");
    incomeRow.getCell(1, 3).setValue("Transfer");


    const accountCell = incomeRow.getCell(1, 4);
    const toAccountCell = incomeRow.getCell(1, 10);
    accountCell.setValue(toAccountCell.getValue());

    currentTransferRow = textFinder.findNext();
  }
}
