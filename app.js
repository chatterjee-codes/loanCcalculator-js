// listen for submit

document.getElementById('loan-form').addEventListener('submit', calculateResults);

//calculate results
function calculateResults(e)
{
    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);
    

    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2); //sets number of decimal to 2
        
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    }
    else
    {
        showError('Please check your inputs');
    }
    e.preventDefault();
}

// show error
function showError(error)
{
    //create a div
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    // creeate text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 2 seconds
    setTimeout(clearError, 1500); //2000 miliseconds
}


function clearError()
{
    document.querySelector('.alert').remove();
}