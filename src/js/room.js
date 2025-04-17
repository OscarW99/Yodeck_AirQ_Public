// Wait for DEVICE_CONFIG to be defined before running
(function() {
    // Check if DEVICE_CONFIG exists, if not wait for it
    if (typeof DEVICE_CONFIG === 'undefined') {
        console.log('DEVICE_CONFIG not found, waiting for it to be defined...');
        
        // Set an interval to check for DEVICE_CONFIG
        const checkInterval = setInterval(function() {
            if (typeof window.DEVICE_CONFIG !== 'undefined') {
                console.log('DEVICE_CONFIG found, initializing room data');
                clearInterval(checkInterval);
                initializeRoom(window.DEVICE_CONFIG, window.themeConfig);
            }
        }, 100);
    } else {
        console.log('DEVICE_CONFIG already defined, initializing room data');
        initializeRoom(DEVICE_CONFIG, themeConfig);
    }
      // Main initialization function
    function initializeRoom(deviceConfig, themeConfig) {
        // Fetch and display air quality data
        async function fetchAndDisplayData() {
            try {
                // Add debugging information
                console.log('Attempting to fetch data from:', deviceConfig.apiUrl);
                console.log('DEVICE_CONFIG:', deviceConfig);
                
                const response = await fetch(deviceConfig.apiUrl);
                console.log('Response received:', response.status);
                const jsonData = await response.json();
                console.log('Response data:', jsonData);
                
                if (!jsonData || jsonData.code !== 200 || !jsonData.data || !jsonData.data.value) {
                    throw new Error('Invalid data format');
                }

                // Update status
                updateRoomStatus(jsonData.data.updateTime);

                const unescapedValue = jsonData.data.value.replace(/\\/g, '');
                const data = JSON.parse(unescapedValue);
                
                const container = document.getElementById('airQualityData');
                container.innerHTML = displayMetricsHtml(data, themeConfig);
            } catch (error) {
                console.error('Error fetching data:', error);
                document.getElementById('airQualityData').innerHTML = `
                    <div class="text-red-400 p-4 rounded-lg bg-red-500/10">
                        ${error.message === 'Invalid data format' ? 'Error: Invalid response from device' : 'Error: Unable to connect to device'}
                    </div>
                `;
                // Update status to error state
                const statusEl = document.getElementById('roomStatus');
                statusEl.className = 'px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300';
                statusEl.textContent = error.message === 'Invalid data format' ? 'Invalid Response' : 'No Connection';
            }
        }

        // Update room status based on last update time
        function updateRoomStatus(updateTime) {
            const statusEl = document.getElementById('roomStatus');
            const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
            const timeDiff = currentTime - parseInt(updateTime);

            // Define status thresholds
            const ONLINE_THRESHOLD = 90; // 1.5 minutes
            const STALE_THRESHOLD = 300; // 5 minutes

            if (timeDiff <= ONLINE_THRESHOLD) {
                statusEl.className = 'px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300';
                statusEl.textContent = 'Online';
            } else if (timeDiff <= STALE_THRESHOLD) {
                statusEl.style.cssText = 'padding: 2px 8px; font-size: 0.75rem; border-radius: 9999px; background-color: rgba(234, 179, 8, 0.2); color: #facc15;';
                statusEl.textContent = 'Stale';
            } else {
                statusEl.className = 'px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300';
                statusEl.textContent = 'Offline';
            }
        }

        // Helper function to generate metrics HTML
        function getHumidityStatus(humidity) {
            if (humidity === undefined || humidity === null || isNaN(humidity)) {
                return {
                    icon: '❌',
                    message: 'Relative air humidity is unavailable. Optimal range: 40–60%.'
                };
            }
            const value = Number(humidity);
            if (value >= 40 && value <= 60) {
                return {
                    icon: '✅',
                    message: 'Relative air humidity is at a comfortable level. Optimal range: 40–60%.'
                };
            } else if (value >= 30 && value < 40) {
                return {
                    icon: '⚠️',
                    message: 'Relative air humidity is is a bit low. Optimal range is 40–60%.'
                };
            } else if (value > 60 && value <= 70) {
                return {
                    icon: '⚠️',
                    message: 'Relative air humidity is is a bit high. Optimal range is 40–60%.'
                };
            } else if (value < 30) {
                return {
                    icon: '❌',
                    message: 'Relative air humidity is is too low. Optimal range is 40–60%.'
                };
            } else if (value > 70) {
                return {
                    icon: '❌',
                    message: 'Relative air humidity is is too high. Optimal range is 40–60%.'
                };
            } else {
                return {
                    icon: '❌',
                    message: 'Relative air humidity is unavailable. Optimal range: 40–60%.'
                };
            }
        }

        function displayMetricsHtml(data, themeConfigObj) {
            // If themeConfig isn't passed, use a default
            const theme = themeConfigObj || {
                metrics: {
                    humidity: { bg: 'from-cyan-500/10 to-blue-500/10', text: 'text-cyan-300' },
                    pm: { bg: 'from-violet-500/10 to-purple-500/10', text: 'text-violet-300' },
                    voc: { bg: 'from-emerald-500/10 to-green-500/10', text: 'text-emerald-300' },
                    nox: { bg: 'from-amber-500/10 to-yellow-500/10', text: 'text-amber-300' },
                    co2: { bg: 'from-rose-500/10 to-red-500/10', text: 'text-rose-300' }
                },
                values: 'text-white'
            };

            // Define sections for different types of measurements
            const sections = [
                {
                    title: 'Humidity',
                    type: 'humidity',
                    value: data.sen55?.humidity,
                    unit: '%',
                    description: 'Relative air humidity'
                },
                {
                    title: 'Particulate Matter',
                    type: 'pm',
                    measurements: [
                        { label: 'PM 1.0', value: data.sen55?.['pm1.0'], unit: 'μg/m³' },
                        { label: 'PM 2.5', value: data.sen55?.['pm2.5'], unit: 'μg/m³' },
                        { label: 'PM 4.0', value: data.sen55?.['pm4.0'], unit: 'μg/m³' },
                        { label: 'PM 10.0', value: data.sen55?.['pm10.0'], unit: 'μg/m³' }
                    ]
                },
                {
                    title: 'VOC Index',
                    type: 'voc',
                    value: data.sen55?.voc,
                    unit: 'ppb',
                    description: 'Volatile Organic Compounds'
                },
                {
                    title: 'NOx Index',
                    type: 'nox',
                    value: data.sen55?.nox,
                    unit: 'ppb',
                    description: 'Nitrogen Oxides'
                },
                {
                    title: 'CO2',
                    type: 'co2',
                    value: data.scd40?.co2,
                    unit: 'ppm',
                    description: 'Carbon Dioxide'
                }
            ];

            // Generate HTML for all sections
            return sections.map(section => {
                if (section.measurements) {
                    // Section with multiple measurements (e.g., PM)
                    return `
                        <div class="rounded-xl p-6 bg-gradient-to-br ${theme.metrics[section.type].bg}">
                            <h2 class="text-lg font-semibold mb-4 ${theme.metrics[section.type].text}">${section.title}</h2>
                            <div class="grid grid-cols-2 gap-4">
                                ${section.measurements.map(m => `
                                    <div>
                                        <div class="text-sm ${theme.metrics[section.type].text}">${m.label}</div>
                                        <div class="text-2xl font-bold ${theme.values}">${formatValue(m.value, m.unit)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    // Single measurement section
                    if (section.type === 'humidity') {
                        const status = getHumidityStatus(section.value);
                        return `
                            <div class="rounded-xl p-6 bg-gradient-to-br ${theme.metrics[section.type].bg}">
                                <h2 class="text-lg font-semibold mb-1 ${theme.metrics[section.type].text}">${section.title}</h2>
                                <div class="text-3xl font-bold mb-2 ${theme.values}">${formatValue(section.value, section.unit)}</div>
                                <div class="text-sm flex items-center gap-2 ${theme.metrics[section.type].text}"><span>${status.icon}</span> <span>${status.message}</span></div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="rounded-xl p-6 bg-gradient-to-br ${theme.metrics[section.type].bg}">
                                <h2 class="text-lg font-semibold mb-1 ${theme.metrics[section.type].text}">${section.title}</h2>
                                <div class="text-3xl font-bold mb-2 ${theme.values}">${formatValue(section.value, section.unit)}</div>
                                <div class="text-sm ${theme.metrics[section.type].text}">${section.description}</div>
                            </div>
                        `;
                    }
                }
            }).join('');
        }

        // Format value with unit
        function formatValue(value, unit) {
            if (value === undefined || value === null) return 'N/A';
            return `${Number(value).toFixed(1)}${unit}`;
        }

        // Initial fetch
        fetchAndDisplayData();

        // Refresh data every 30 seconds
        setInterval(fetchAndDisplayData, 30000);
    }
})();

// Update room status based on last update time
function updateRoomStatus(updateTime) {
    const statusEl = document.getElementById('roomStatus');
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    const timeDiff = currentTime - parseInt(updateTime);

    // Define status thresholds
    const ONLINE_THRESHOLD = 90; // 1.5 minutes
    const STALE_THRESHOLD = 300; // 5 minutes

    if (timeDiff <= ONLINE_THRESHOLD) {
        statusEl.className = 'px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300';
        statusEl.textContent = 'Online';
    } else if (timeDiff <= STALE_THRESHOLD) {
        statusEl.style.cssText = 'padding: 2px 8px; font-size: 0.75rem; border-radius: 9999px; background-color: rgba(234, 179, 8, 0.2); color: #facc15;';
        statusEl.textContent = 'Stale';
    } else {
        statusEl.className = 'px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300';
        statusEl.textContent = 'Offline';
    }
}

// Helper function to generate metrics HTML
function displayMetricsHtml(data) {
    // Define sections for different types of measurements
    const sections = [
        {
            title: 'Humidity',
            type: 'humidity',
            value: data.sen55?.humidity,
            unit: '%',
            description: 'Relative air humidity'
        },
        {
            title: 'Particulate Matter',
            type: 'pm',
            measurements: [
                { label: 'PM 1.0', value: data.sen55?.['pm1.0'], unit: 'μg/m³' },
                { label: 'PM 2.5', value: data.sen55?.['pm2.5'], unit: 'μg/m³' },
                { label: 'PM 4.0', value: data.sen55?.['pm4.0'], unit: 'μg/m³' },
                { label: 'PM 10.0', value: data.sen55?.['pm10.0'], unit: 'μg/m³' }
            ]
        },
        {
            title: 'VOC Index',
            type: 'voc',
            value: data.sen55?.voc,
            unit: 'ppb',
            description: 'Volatile Organic Compounds'
        },
        {
            title: 'NOx Index',
            type: 'nox',
            value: data.sen55?.nox,
            unit: 'ppb',
            description: 'Nitrogen Oxides'
        },
        {
            title: 'CO2',
            type: 'co2',
            value: data.scd40?.co2,
            unit: 'ppm',
            description: 'Carbon Dioxide'
        }
    ];

    // Generate HTML for all sections
    return sections.map(section => {
        if (section.measurements) {
            // Section with multiple measurements (e.g., PM)
            return `
                <div class="rounded-xl p-6 bg-gradient-to-br ${themeConfig.metrics[section.type].bg}">
                    <h2 class="text-lg font-semibold mb-4 ${themeConfig.metrics[section.type].text}">${section.title}</h2>
                    <div class="grid grid-cols-2 gap-4">
                        ${section.measurements.map(m => `
                            <div>
                                <div class="text-sm ${themeConfig.metrics[section.type].text}">${m.label}</div>
                                <div class="text-2xl font-bold ${themeConfig.values}">${formatValue(m.value, m.unit)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            // Single measurement section
            if (section.type === 'humidity') {
                const status = getHumidityStatus(section.value);
                return `
                    <div class="rounded-xl p-6 bg-gradient-to-br ${themeConfig.metrics[section.type].bg}">
                        <h2 class="text-lg font-semibold mb-1 ${themeConfig.metrics[section.type].text}">${section.title}</h2>
                        <div class="text-3xl font-bold mb-2 ${themeConfig.values}">${formatValue(section.value, section.unit)}</div>
                        <div class="text-sm flex items-center gap-2 ${themeConfig.metrics[section.type].text}"><span>${status.icon}</span> <span>${status.message}</span></div>
                    </div>
                `;
            } else {
                return `
                    <div class="rounded-xl p-6 bg-gradient-to-br ${themeConfig.metrics[section.type].bg}">
                        <h2 class="text-lg font-semibold mb-1 ${themeConfig.metrics[section.type].text}">${section.title}</h2>
                        <div class="text-3xl font-bold mb-2 ${themeConfig.values}">${formatValue(section.value, section.unit)}</div>
                        <div class="text-sm ${themeConfig.metrics[section.type].text}">${section.description}</div>
                    </div>
                `;
            }
        }
    }).join('');
}

// Format value with unit
function formatValue(value, unit) {
    if (value === undefined || value === null) return 'N/A';
    return `${Number(value).toFixed(1)}${unit}`;
}

// Initial fetch
fetchAndDisplayData();

// Refresh data every 30 seconds
setInterval(fetchAndDisplayData, 30000);