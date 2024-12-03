# ivy-to-cashew-csv-import
A Google Sheet script to convert Ivy Wallet exported CSVs into Cashew-compatible CSVs.

## Running the script

1. Import your Ivy Wallet CSV into Google Sheets by navigating to File > Import and uploading your .csv file. Choose your preferred **Import location**. **Separator type** can be left as "Detect automatically".
2. Access your sheet's scripts through Extensions > Apps Script.
3. In your Apps Script Editor, add a new file. Name it whatever you'd like. Copy the contents of the script `ivyToCashew.gs` in this repo into your editor. Save the file.
4. You should see a function dropdown next to the buttons "Run" and "Debug". Make sure `convertExpenses` is selected, and press "Run" to start the script.
   
   ![Apps Script function dropdown](https://i.ibb.co/S7M8zfn/image.png)

6. Once `convertExpenses` has completed (you should see `Execution completed` in the Execution log), select `convertTransfers` in the function dropdown. Press "Run" to start converting "Transfers" into separated Expense/Income transactions, with the category "Transfer". You can later merge this into your *Balance Correction* category in Cashew (You can read more about this from Cashew's FAQ: [https://cashewapp.web.app/faq.html#import-csv-data](https://cashewapp.web.app/faq.html#import-csv-data))
7. `convertTransfers` takes a while to run, and may hit the execution time limit every so often, especially if you have many transactions. If this happens, don't worry. You can re-run the script. But make sure your "Transfer" rows weren't deleted and left empty.

    ![Exceeded maximum execution time](https://i.ibb.co/jw8Rh5d/image.png)
    1. Open Version History and scroll through until the last highlighted rows. Check that no empty rows exist. If there are, go back to your sheet, scroll to those empty rows, and hit CTRL+Z until the original "Transfer" row is restored.
    2. Re-run the script by going back to your Apps Script. Make sure `convertTransfers` is selected. Press "Run".
9. Once completed, export your Google Sheets by pressing File > Download > Comma Separated Values. Import this file into Cashew.
