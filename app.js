const queryParamToElementMap = {
    'cp': 'compound-principal',
    'ci': 'compound-interest',
    'cy': 'compound-years',
    'cagra': 'cagr-amount',
    'cagrf': 'cagr-final',
    'cagry': 'cagr-years',
}
const elementToQueryParamMap = (Object.entries(queryParamToElementMap)).reduce((accumulator, current, index) => {
    accumulator[current[1]] = current[0]
    return accumulator
}, {})

document.addEventListener('DOMContentLoaded', () => {
    const url = document.URL
    const urlSearchParams = new URLSearchParams(url.split('?')[1])
    let interestForm = document.getElementById('interest-form');
    let cagrForm = document.getElementById('cagr-form');
    for (item of Object.values(queryParamToElementMap)) {
        const element = document.getElementById(item)
        element.addEventListener('change', (event) => {
            const id = event.target.id
            const value = event.target.value
            urlSearchParams.set(elementToQueryParamMap[id], value)
            history.replaceState('', '', `${document.location.origin}${document.location.pathname}?${urlSearchParams.toString()}`)
        })
    }
    interestForm.addEventListener('submit', (event) => calculateInterest(event, interestForm, cagrForm, urlSearchParams));
    cagrForm.addEventListener('submit', (event) => calculateCAGR(event, cagrForm, interestForm, urlSearchParams));
    autofill(urlSearchParams)
});

function calculateCAGR(event, cagrForm, interestForm, searchParams) {

    event.preventDefault();
    clear();
    clearForm(interestForm, searchParams, 'compound')

    let principal = parseFloat(cagrForm[0].value);
    let final = parseFloat(cagrForm[1].value);
    let years = parseFloat(cagrForm[2].value);

    if (isNaN(principal) || isNaN(final) || isNaN(years)) {
        return;
    }

    let interest = (Math.pow(final / principal, 1 / years) - 1) * 100;

    let CAGR = document.createElement('h2');

    CAGR.innerHTML = `CAGR: ${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;

    document.body.appendChild(CAGR);

    createTable(principal, interest, years);

}

function calculateInterest(event, interestForm, cagrForm, searchParams) {

    event.preventDefault();
    clear();
    clearForm(cagrForm, searchParams, 'cagr');

    let principal = parseFloat(interestForm[0].value);
    let interest = parseFloat(interestForm[1].value);
    let years = parseInt(interestForm[2].value);

    if (isNaN(principal) || isNaN(interest) || isNaN(years)) {
        return;
    }

    createTable(principal, interest, years);

}

function createTable(principal, interest, years) {

    const table = document.createElement('table');

    let thead = table.createTHead();
    let tbody = table.createTBody();

    thead.innerHTML = "<tr><th>Year</th><th>Amount</th><th>Interest</th><th>Total</th></tr>"

    for (let i = 0; i < years; i++) {
        let yearlyInterest = (principal / 100) * interest;

        let row = tbody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = i;
        cell2.innerHTML = principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        cell3.innerHTML = ((principal / 100) * interest).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        cell4.innerHTML = (yearlyInterest + principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        principal += (principal / 100) * interest;
    }

    document.body.appendChild(table);
}

function clear() {
    if (document.querySelector('table') !== null) {
        document.querySelector('table').remove();
    }

    if (document.querySelector('h2') !== null) {
        document.querySelector('h2').remove();
    }
}

function clearForm(HTMLForm, searchParams, idPrefix) {
    for (let element of HTMLForm) {
        if (String(element.id).startsWith(idPrefix)) {
            searchParams.delete(elementToQueryParamMap[element.id])
        }
        if (element.type === "number") {
            element.value = ""
        }
    }
    history.replaceState('', '', `${document.location.origin}${document.location.pathname}?${searchParams.toString()}`)
}

function autofill(queryParams) {
    if (queryParams.size > 0) {
        const compoundCalculator = {
            requiredParams: ['cp', 'ci', 'cy'],
            numberOfParams: 0,
            submitButtonId: 'compound-submit'
        }
        const cagrCalculator = {
            requiredParams: ['cagra', 'cagrf', 'cagry'],
            numberOfParams: 0,
            submitButtonId: 'cagr-submit'
        }
        for (qParam of queryParams.entries()) {
            const param = qParam[0]
            const value = qParam[1]
            const elementId = queryParamToElementMap[param]
            if (elementId !== undefined) {
                const element = document.getElementById(elementId)
                element.value = Number(value)
            }
            for (const calculator of [compoundCalculator, cagrCalculator]) {
                if (calculator.requiredParams.includes(param)) {
                    calculator.numberOfParams = calculator.numberOfParams + 1
                    if (calculator.numberOfParams === 3) {
                        const submitButton = document.getElementById(calculator.submitButtonId)
                        submitButton.click()
                    }
                }
            }
        }
    }
}