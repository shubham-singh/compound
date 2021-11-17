document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('submit');
    let interestForm = document.getElementById('interest-form');
    let cagrForm = document.getElementById('cagr-form');
    interestForm.addEventListener('submit', (event) => calculateInterest(event ,interestForm, cagrForm));
    cagrForm.addEventListener('submit', (event) => calculateCAGR(event ,cagrForm, interestForm));
});

function calculateCAGR(event, cagrForm, interestForm) {

    event.preventDefault();
    clear();
    clearForm(interestForm)

    let principal = parseFloat(cagrForm[0].value);
    let final = parseFloat(cagrForm[1].value);
    let years = parseFloat(cagrForm[2].value);

    if(isNaN(principal) || isNaN(final) || isNaN(years)) {
        return;
    }

    let interest = (Math.pow(final / principal, 1 / years) - 1) * 100;

    let CAGR = document.createElement('h2');

    CAGR.innerHTML = `CAGR: ${interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} %`;

    document.body.appendChild(CAGR);

    createTable(principal, interest, years);

}

function calculateInterest(event, interestForm, cagrForm) {

    event.preventDefault();
    clear();
    clearForm(cagrForm);

    let principal = parseFloat(interestForm[0].value);
    let interest = parseFloat(interestForm[1].value);
    let years = parseInt(interestForm[2].value);

    if(isNaN(principal) || isNaN(interest) || isNaN(years)) {
        return;
    }

    createTable(principal, interest, years);

}

function createTable(principal, interest, years) {

    const table = document.createElement('table');
    
    let thead = table.createTHead();
    let tbody = table.createTBody();
    
    thead.innerHTML = "<tr><th>Year</th><th>Amount</th><th>Interest</th><th>Total</th></tr>"
    
    for (let i = 0; i < years; i++)
    {
        let yearlyInterest = (principal / 100) * interest;
        
        let row = tbody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = i;
        cell2.innerHTML = principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        cell3.innerHTML = ((principal / 100) * interest).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        cell4.innerHTML = (yearlyInterest + principal).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        principal += (principal / 100) * interest;
    }

    document.body.appendChild(table);
}

function clear() {
    if (document.querySelector('table') !== null)
    {
        document.querySelector('table').remove();
    }

    if (document.querySelector('h2') !== null)
    {
        document.querySelector('h2').remove();
    }
}

function clearForm(HTMLForm) {
    for (let element of HTMLForm) {
        if (element.type === "number") {
            element.value = ""
        }
    }
}