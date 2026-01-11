/**
 * Google Apps Script for Workforce Recruitment Solutions
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/12yfnfWguB0OPhTAkEwaP4yoS0ABBDYZ0CwtyAidWv70/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire code into the script editor
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon (⚙️) next to "Select type" and choose "Web app"
 * 7. Set:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Click "Deploy"
 * 9. Copy the Web App URL that appears
 * 10. Paste that URL in the admin dashboard Settings > Google Sheets Integration > Web App URL
 * 
 * Your Google Sheet columns:
 * - Name (Column A)
 * - Email (Column B)
 * - Phone (Column C)
 * - Position (Column D)
 * - Experience (Column E)
 * - Cover Letter (Column F)
 * - Resume (Column G)
 * - Date (Column H)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('12yfnfWguB0OPhTAkEwaP4yoS0ABBDYZ0CwtyAidWv70').getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Get or create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Name',
        'Email',
        'Phone',
        'Position',
        'Experience',
        'Cover Letter',
        'Resume',
        'Date'
      ]);
    }
    
    // Append the application data
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.phone || '',
      data.position || '',
      data.experience || '',
      data.coverLetter || '',
      data.resumeFileName || 'No file',
      new Date()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Workforce Recruitment Solutions - Google Sheets Integration',
    status: 'active'
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

// Test function (optional - you can run this from the Apps Script editor to test)
function testAppend() {
  var sheet = SpreadsheetApp.openById('12yfnfWguB0OPhTAkEwaP4yoS0ABBDYZ0CwtyAidWv70').getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Name',
      'Email',
      'Phone',
      'Position',
      'Experience',
      'Cover Letter',
      'Resume',
      'Date'
    ]);
  }
  
  sheet.appendRow([
    'Test Name',
    'test@example.com',
    '123-456-7890',
    'Test Position',
    '5 years',
    'Test cover letter',
    'test-resume.pdf',
    new Date()
  ]);
  
  Logger.log('Test data appended successfully');
}
