function compound() {
    if (document.querySelector('table') !== null)
    {
        document.querySelector('table').remove();
    }

    let principal = parseFloat(document.getElementById('principal').value);
    let interest = parseFloat(document.getElementById('interest').value);
    let years = parseInt((document.getElementById('years')).value);
    // if(isNaN(principal) || isNaN(interest) || isNaN(years))
    // if(principal === NaN || interest === NaN || years === NaN)
    // {
    //     console.log('lol');
    //     return;
    // }
    const table = document.createElement('table');
    let header = table.createTHead();
    let row = table.insertRow(0);
    let head1 = row.insertCell(0);
    let head2 = row.insertCell(1);
    let head3 = row.insertCell(2);
    head1.innerHTML = "Year";
    head2.innerHTML = "Amount";
    head3.innerHTML = "Interest Earned";
    
    for (let i = 0, n = years; i <= n; i++)
    {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = i;
        cell2.innerHTML = principal.toFixed(2);
        cell3.innerHTML = ((principal / 100) * interest).toFixed(2) ;
        principal += (principal / 100) * interest;
    }
    console.log(table);
    document.body.appendChild(table);
}


document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('submit');
    btn.addEventListener('click', compound);
});