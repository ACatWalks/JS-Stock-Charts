async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //Fetch requests commented out because I was getting messages saying I had exceeded my API credits and I don't want to pay for more

    /*const gme = await fetch('https://api.twelvedata.com/time_series?symbol=GME&interval=30min&apikey=4fc46edb6649483e97727c679337a986');
    const gmeObj = await gme.json();
    console.log(gmeObj);

    const msft = await fetch('https://api.twelvedata.com/time_series?symbol=MSFT&interval=30min&apikey=4fc46edb6649483e97727c679337a986');
    const msftObj = await msft.json();
    console.log(msftObj);

    const dis = await fetch('https://api.twelvedata.com/time_series?symbol=DIS&interval=30min&apikey=4fc46edb6649483e97727c679337a986');
    const disObj = await dis.json();
    console.log(disObj);

    const bntx = await fetch('https://api.twelvedata.com/time_series?symbol=BNTX&interval=30min&apikey=4fc46edb6649483e97727c679337a986');
    const bntxObj = await bntx.json();
    console.log(bntxObj);*/

    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach( stock => stock.values.reverse());

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor:getColor(stock.meta.symbol)
            }))
        },
    });
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    function getHighest(values){
        let highest = values[0].high;
        for(let i=1; i<values.length; i++){
            if(values[i].high > highest){
                highest = values[i].high;
            }
        }
        console.log(highest);
        return highest;
    }
    
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    getHighest(stock.values)
                ))
            }]
        }
    });
    function getAverage(values){
        let sum = 0;
        for(let i=0; i<values.length; i++){
            sum += values[i]
        }
        return sum/values.length
    }
    new Chart(averagePriceChartCanvas.getContext('2d'),{
        type: 'pie',
        data: {
            labels: ['GME', 'MSFT', 'DIS', 'BTNX'],
            datasets: [
                {
                    label: 'GME',
                    data: getAverage(GME.values),
                    backgroundColor: getColor('GME')
                },
                {
                    label: 'MSFT',
                    data: getAverage(MSFT.values),
                    backgroundColor: getColor('MSFT')
                },
                {
                    label: 'DIS',
                    data: getAverage(DIS.values),
                    backgroundColor: getColor('DIS')
                },
                {
                    label: 'BNTX',
                    data: getAverage(BNTX.values),
                    backgroundColor: getColor('BNTX')
                }
            ]
        }
    })
}

main()