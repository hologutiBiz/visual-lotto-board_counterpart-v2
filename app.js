// Local global runtime reference to hold our key-value flat data structure
let lottoDataMatrix = null;

// --- DOM Element Nodes ---
const numberInput = document.getElementById('lottoNumberInput');
const lookupBtn = document.getElementById('lookupBtn');
const errorMsg = document.getElementById('errorMsg');
const loadingState = document.getElementById('loadingState');
const matrixContainer = document.getElementById('matrixContainer');
const tableBodyOne = document.getElementById('tableBodyOne');
const tableBodyTwo = document.getElementById('tableBodyTwo');

/**
 * Downloads the flat JSON structure from centralized Firebase Storage
 * and triggers the data matrix table compilation.
 */
async function loadLottoMatrix() {
  try {
    const response = await fetch('./counterpart-v2.json');

    if (!response.ok) {
      throw new Error(`HTTP network error! Status: ${response.status}`);
    }

    lottoDataMatrix = await response.json();
    
    // Compile and render HTML structural layout rows
    populateTables();
    
    // Toggle system visual view states if you take down maintenance page later
    if(loadingState) loadingState.classList.add('hidden');
    if(matrixContainer) matrixContainer.classList.remove('hidden');
    
  } catch (error) {
    console.error("Critical architectural error fetching storage asset data:", error);
  }
}

/**
 * Loops exactly from 1 to 90 against our flat key map, routing indices
 * to table body partitions respectively.
 */
function populateTables() {
    let htmlOne = '';
    let htmlTwo = '';

    for (let i = 1; i <= 90; i++) {
        const numKey = i.toString();
        const record = lottoDataMatrix[numKey];
        
        if (record) {
        const stringifiedRowHtml = generateRowHtml(i, record);
        if (i <= 45) {
            htmlOne += stringifiedRowHtml;
        } else {
            htmlTwo += stringifiedRowHtml;
        }
        }
    }
    
    tableBodyOne.innerHTML = htmlOne;
    tableBodyTwo.innerHTML = htmlTwo;
}

/**
 * Builds individual raw structural HTML row 
 */
function generateRowHtml(num, record) {
    return `
        <tr id="row-${num}">
            <td class="num-cell">${num}</td>
            <td>${record.counterpart ?? '—'}</td>
            <td>${record.bonanza ?? '—'}</td>
            <td>${record.malta ?? '—'}</td>
            <td>${record.stringkey ?? '—'}</td>
            <td>${record.shadow ?? '—'}</td>
            <td>${record.partner ?? '—'}</td>
            <td>${record.equivalent ?? '—'}</td>
            <td>${record.code ?? '—'}</td>
            <td>${record.turning ?? '—'}</td>
        </tr>
    `;
}

/**
 * Locates the specific document record node row, applies targeted 
 * highlight color classes, and auto-scrolls view bounds smoothly.
 */
function highlightRow(num) {
    // Reset all existing highlights across both columns
    document.querySelectorAll('tr[id^="row-"]').forEach(row => {
        row.classList.remove('highlight-row');
    });
    errorMsg.classList.add('hidden');

    const targetRow = document.getElementById(`row-${num}`);
    if (targetRow) {
        // Inject the custom CSS highlight layout class
        targetRow.classList.add('highlight-row');
        
        // Smooth scrolling animation focus
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        errorMsg.textContent = "Requested structural index value missing inside array.";
        errorMsg.classList.remove('hidden');
    }
}

/**
 * Processes, sanitizes, and runs boundary criteria checks on search inputs
 */
function handleLookupAction() {
    const inputVal = numberInput.value.trim();
    const num = parseInt(inputVal, 10);

    if (!inputVal || isNaN(num) || num < 1 || num > 90) {
        errorMsg.textContent = "Please enter a valid number between 1 and 90.";
        errorMsg.classList.remove('hidden');
        return;
    }

    highlightRow(num);
}

// --- Event Listeners Subscriptions ---
lookupBtn.addEventListener('click', handleLookupAction);
numberInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLookupAction();
});

// Run engine load pipeline immediately
loadLottoMatrix();


// Lotto Classification Chart app
var counterpartQrCode = new QRCode("counterpart_qrCode", {
   text: "https://play.google.com/store/apps/details?id=com.visuallottoboard.lottoclassificationchart",
   colorDark: "#000000",
   colorLight: "#ffffff",
   correctLevel : QRCode.CorrectLevel.H
});

// Execute after page setup
generateAppQRCode();


// Megapot sticky banner close button
// document.getElementById('megapotClose')?.addEventListener('click', () => {
//   document.getElementById('megapotSticky').style.display = 'none';
// });
