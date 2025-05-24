
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if the element exists
    const bitcoinDetailChart = document.getElementById('bitcoinDetailChart');
    if (bitcoinDetailChart) {
        // Sample data
        const dates = ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7'];
        const prices = [82500, 83200, 84100, 83900, 84500, 85100, 85700];
        
        new Chart(bitcoinDetailChart, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Bitcoin Price (USD)',
                    data: prices,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            borderDash: [5, 5]
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
});

// fliter fuction
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('cryptoSearch');
    const tableRows = document.querySelectorAll('tbody tr');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Search functionality
    searchInput.addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      
      tableRows.forEach(row => {
        const coinName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (coinName.includes(searchTerm)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (filter === 'all') {
          tableRows.forEach(row => row.style.display = '');
        } else if (filter === 'gainers') {
          tableRows.forEach(row => {
            const dailyChange = parseFloat(row.querySelector('td:nth-child(5)').textContent);
            row.style.display = dailyChange > 0 ? '' : 'none';
          });
        } else if (filter === 'losers') {
          tableRows.forEach(row => {
            const dailyChange = parseFloat(row.querySelector('td:nth-child(5)').textContent);
            row.style.display = dailyChange < 0 ? '' : 'none';
          });
        }
      });
    });
  });

//   body Chart
document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real implementation, you would fetch from an API
    const chartData = {
      bitcoin: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        prices: [65000, 69000, 72000, 68000, 75000, 79000, 85000]
      },
      ethereum: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        prices: [2100, 2300, 2500, 2200, 2400, 2600, 2200]
      },
      tether: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        prices: [1, 1, 1, 1, 1, 1, 1]
      }
    };
  
    const charts = document.querySelectorAll('.crypto-chart');
    charts.forEach(chart => {
      const coin = chart.getAttribute('data-coin');
      const data = chartData[coin] || chartData.bitcoin;
      
      new Chart(chart, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Price (USD)',
            data: data.prices,
            borderColor: '#28a745',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          }
        }
      });
    });
  });

//   calculater

document.addEventListener('DOMContentLoaded', function() {
    const cryptoSelect = document.getElementById('cryptoSelect');
    const amountInput = document.getElementById('amountInput');
    const coinAmount = document.getElementById('coinAmount');
    const coinSymbol = document.getElementById('coinSymbol');
    const calculatedPrice = document.getElementById('calculatedPrice');
    
    function updateCalculation() {
      const selectedOption = cryptoSelect.options[cryptoSelect.selectedIndex];
      const price = parseFloat(selectedOption.value);
      const amount = parseFloat(amountInput.value);
      const symbol = selectedOption.getAttribute('data-symbol');
      
      coinAmount.textContent = amount;
      coinSymbol.textContent = symbol;
      calculatedPrice.textContent = (price * amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    cryptoSelect.addEventListener('change', updateCalculation);
    amountInput.addEventListener('input', updateCalculation);
  });

//   update_price
function updatePrices() {
    const priceElements = document.querySelectorAll('.card-text:nth-child(2)');
    
    priceElements.forEach(element => {
      const currentPrice = parseFloat(element.textContent.replace('Price: $', '').replace(',', ''));
      const changePercent = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
      const newPrice = currentPrice * (1 + changePercent / 100);
      
      // Update the price
      element.textContent = `Price: $${newPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      
      // Visual feedback for price change
      if (changePercent > 0) {
        element.classList.add('text-success');
        element.classList.remove('text-danger');
      } else {
        element.classList.add('text-danger');
        element.classList.remove('text-success');
      }
    });
  }
  setInterval(updatePrices, 2000);

// mode chage
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
        htmlElement.setAttribute('data-bs-theme', 'light');
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
        localStorage.setItem('darkMode', null);
    }
});
