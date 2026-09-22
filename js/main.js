const sensorData=[
  ["Temperature Sensors","fa-temperature-half","Measure thermal energy for climate, safety and process control.","Thermal input"],
  ["Humidity Sensors","fa-droplet","Track moisture in air, soil and controlled environments.","Environmental input"],
  ["Pressure Sensors","fa-gauge-high","Detect force and pressure in fluid, industrial and wearable systems.","Physical input"],
  ["Motion Sensors","fa-person-running","Recognise movement to make spaces and machines responsive.","Movement input"],
  ["Proximity Sensors","fa-arrows-to-circle","Understand when objects are near without physical contact.","Spatial input"],
  ["Light Sensors","fa-sun","Read illumination for displays, agriculture and smart lighting.","Optical input"],
  ["Gas Sensors","fa-wind","Identify gases and air-quality changes for safer environments.","Chemical input"],
  ["Sound Sensors","fa-volume-high","Turn acoustic energy into signals for interaction and monitoring.","Audio input"],
  ["Accelerometers","fa-arrow-up-wide-short","Measure acceleration across axes in devices and machines.","Motion input"],
  ["Gyroscopes","fa-rotate","Sense orientation and rotation for navigation and robotics.","Orientation input"],
  ["Magnetic Sensors","fa-magnet","Detect magnetic fields for position, speed and switching.","Magnetic input"],
  ["Distance Sensors","fa-ruler-horizontal","Calculate the space between objects using waves or light.","Spatial input"],
  ["Touch Sensors","fa-hand-pointer","Create direct, intuitive interaction with electronic systems.","Interface input"],
  ["Image Sensors","fa-camera","Capture light patterns so systems can interpret a scene.","Visual input"],
  ["Environmental Sensors","fa-leaf","Observe the conditions that shape people, places and ecosystems.","Context input"],
  ["Biomedical Sensors","fa-heart-pulse","Support measured, human-centred health and wellbeing technologies.","Human input"]
];

const hubData=["Sensor Basics","Sensor Types","Sensor Selection","Circuit Integration","Microcontrollers","Arduino","ESP32","Raspberry Pi","IoT","Automation","Robotics","Projects","Experiments","Troubleshooting","Innovation Ideas"];
const projectData=[
  ["Smart Plant Monitor","Beginner","Environmental"],["Automatic Room Lighting","Beginner","Light + Motion"],["Air Quality Monitor","Intermediate","Gas"],["Smart Parking System","Intermediate","Distance"],["Motion-Based Security","Beginner","Motion"],["Smart Irrigation","Intermediate","Humidity"],["Temperature Monitoring","Beginner","Temperature"],["Obstacle Detection","Beginner","Distance"],["Energy Monitoring","Advanced","Current"],["Smart Waste Management","Intermediate","Proximity"]
];
const iconForHub={"Sensor Basics":"fa-book-open","Sensor Types":"fa-layer-group","Sensor Selection":"fa-filter","Circuit Integration":"fa-plug","Microcontrollers":"fa-microchip","Arduino":"fa-code","ESP32":"fa-wifi","Raspberry Pi":"fa-server","IoT":"fa-network-wired","Automation":"fa-gears","Robotics":"fa-robot","Projects":"fa-diagram-project","Experiments":"fa-flask","Troubleshooting":"fa-screwdriver-wrench","Innovation Ideas":"fa-lightbulb"};

// Populate Index Grid
const sensorGrid=document.querySelector("#sensor-grid");
if(sensorGrid){
  sensorData.forEach(([title,icon,description,meta])=>{
    const card=document.createElement("article");
    card.className="sensor-card feature-card reveal";
    card.dataset.sensor=title;
    card.innerHTML=`<i class="fa-solid ${icon}"></i><h3>${title}</h3><p>${description}</p><small>${meta} →</small>`;
    sensorGrid.append(card);
  });
}

const hubGrid=document.querySelector("#hub-grid");
if(hubGrid){
  hubData.forEach(title=>{
    const card=document.createElement("article");
    card.className="hub-card reveal";
    card.dataset.search=title.toLowerCase();
    const linkTarget = title === "Sensor Types" ? 'href="types-of-sensors.html"' : 'href="#contact"';
    card.innerHTML=`<i class="fa-solid ${iconForHub[title]}"></i><h3>${title}</h3><p>Explore practical knowledge and useful starting points.</p><a ${linkTarget} style="display:inline-block;margin-top:12px;color:var(--cyan);font-size:11px;font-weight:600;">Learn more →</a>`;
    hubGrid.append(card);
  });
}

const projectsGrid=document.querySelector("#projects-grid");
if(projectsGrid){
  projectData.forEach(([title,difficulty,category])=>{
    const card=document.createElement("article");
    card.className="project-card reveal";
    card.dataset.search=`${title} ${difficulty} ${category}`.toLowerCase();
    card.innerHTML=`<small>${difficulty} · ${category}</small><h3>${title}</h3><p>A project idea/example to help turn a signal into a useful system.</p><a href="#contact" aria-label="View ${title} idea">View idea <i class="fa-solid fa-arrow-right"></i></a>`;
    projectsGrid.append(card);
  });
}

// Global Nav, Header & Theme Switcher
const header=document.querySelector(".site-header"), menu=document.querySelector(".menu-toggle"), nav=document.querySelector(".primary-nav"), backTop=document.querySelector("#back-top");
const themeToggle=document.querySelector(".theme-toggle");
const themeMeta=document.querySelector('meta[name="theme-color"]');
const preferredTheme=window.matchMedia("(prefers-color-scheme: light)");
const savedTheme=localStorage.getItem("sensor-theme");
const applyTheme=theme=>{
  const isLight=theme==="light";
  document.documentElement.dataset.theme=isLight?"light":"dark";
  if(themeToggle){
    themeToggle.setAttribute("aria-pressed",String(isLight));
    themeToggle.setAttribute("aria-label",isLight?"Switch to dark theme":"Switch to light theme");
    themeToggle.innerHTML=`<i class="fa-solid fa-${isLight?"moon":"sun"}"></i><span>${isLight?"Dark":"Light"}</span>`;
  }
  if(themeMeta)themeMeta.setAttribute("content",isLight?"#f4f7fb":"#050816");
};
applyTheme(savedTheme || "light");

if(themeToggle){
  themeToggle.addEventListener("click",()=>{
    const nextTheme=document.documentElement.dataset.theme==="light"?"dark":"light";
    localStorage.setItem("sensor-theme",nextTheme);
    applyTheme(nextTheme);
  });
}

if(menu && nav){
  menu.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    menu.setAttribute("aria-expanded",open);
    menu.innerHTML=`<i class="fa-solid fa-${open?"xmark":"bars"}"></i>`;
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded","false");
    menu.innerHTML='<i class="fa-solid fa-bars"></i>';
  }));
}

// Universal Page & Nav Active Link Highlighting
const initUniversalActiveNav = () => {
  const currentPath = window.location.pathname.toLowerCase().split("/").pop() || "index.html";
  const allNavLinks = document.querySelectorAll(".primary-nav > a:not(.button), .footer-grid div:not(.footer-brand) a");

  // Determine active target based on current filename
  let pageKey = "index.html";
  if (currentPath.includes("types-of-sensors")) pageKey = "types-of-sensors.html";
  else if (currentPath.includes("innovation")) pageKey = "innovation.html";
  else if (currentPath.includes("learning")) pageKey = "learning.html";
  else if (currentPath.includes("projects")) pageKey = "projects.html";
  else if (currentPath === "" || currentPath.includes("index")) pageKey = "index.html";

  allNavLinks.forEach(link => {
    const rawHref = link.getAttribute("href") || "";
    const cleanHref = rawHref.split("#")[0].split("/").pop();

    const isMatch = (cleanHref === pageKey) || 
      (pageKey === "index.html" && (cleanHref === "" || cleanHref === "index.html" || rawHref === "#home"));

    if (isMatch && !rawHref.includes("#")) {
      link.classList.add("active");
      if (link.closest(".primary-nav")) {
        link.setAttribute("aria-current", "page");
      }
    } else if (!rawHref.includes("#")) {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
};

initUniversalActiveNav();

window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  if (backTop) backTop.classList.toggle("visible", window.scrollY > 600);
}, { passive: true });

if(backTop) backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

// Reveal animation observer
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add("revealed");
    observer.unobserve(entry.target);
  }
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Index Page Sensor Modal
const modal=document.querySelector("#sensor-modal");
if(modal && sensorGrid){
  const modalTitle=document.querySelector("#modal-title");
  const modalDescription=document.querySelector("#modal-description");
  const modalMeta=document.querySelector("#modal-meta");
  sensorGrid.addEventListener("click",event=>{
    const card=event.target.closest(".sensor-card");
    if(!card)return;
    const data=sensorData.find(item=>item[0]===card.dataset.sensor);
    if(data){
      modalTitle.textContent=data[0];
      modalDescription.textContent=`${data[2]} This is a starting point for exploring how ${data[0].toLowerCase()} can connect physical conditions with data, intelligence and action.`;
      modalMeta.textContent=data[3];
      modal.hidden=false;
      const closeBtn = modal.querySelector(".modal-close");
      if(closeBtn) closeBtn.focus();
    }
  });
}

// Universal Modal Close Handlers
document.querySelectorAll(".modal-close").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const m = btn.closest(".modal-backdrop");
    if(m) m.hidden = true;
  });
});
document.querySelectorAll(".modal-backdrop").forEach(m=>{
  m.addEventListener("click",e=>{if(e.target===m)m.hidden=true});
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    document.querySelectorAll(".modal-backdrop").forEach(m=>m.hidden=true);
  }
});

// Index Hub Search
const hubSearch=document.querySelector("#hub-search");
if(hubSearch){
  hubSearch.addEventListener("input",event=>{
    const query=event.target.value.toLowerCase().trim();
    document.querySelectorAll("#hub-grid .hub-card,#projects-grid .project-card").forEach(card=>{
      card.hidden=query&&!card.dataset.search.includes(query);
    });
  });
}

// -------------------------------------------------------------
// Interactive Catalog & Specs Modal for Types of Sensors Page
// -------------------------------------------------------------
const filterButtons=document.querySelectorAll(".filter-btn");
const catalogCards=document.querySelectorAll(".catalog-card");
const catalogSearch=document.querySelector("#catalog-search");
const countDisplay=document.querySelector("#visible-count");

let activeCategory="all";
let activeQuery="";

const updateCatalogFilter=()=>{
  let visibleCount=0;
  catalogCards.forEach(card=>{
    const cat=card.dataset.category || "";
    const searchContent=(card.dataset.search || card.textContent).toLowerCase();
    const matchesCat = activeCategory==="all" || cat===activeCategory;
    const matchesSearch = !activeQuery || searchContent.includes(activeQuery);
    const isVisible = matchesCat && matchesSearch;
    card.hidden = !isVisible;
    if(isVisible) visibleCount++;
  });
  if(countDisplay){
    countDisplay.textContent = `${visibleCount} Sensor Types Shown`;
  }
};

if(filterButtons.length>0){
  filterButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      filterButtons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory=btn.dataset.filter || "all";
      updateCatalogFilter();
    });
  });
}

if(catalogSearch){
  catalogSearch.addEventListener("input",e=>{
    activeQuery=e.target.value.toLowerCase().trim();
    updateCatalogFilter();
  });
}

// Sensor Specification Deep-Dive Data
const sensorSpecCatalog = {
  "thermocouple": {
    title: "Thermocouples & RTDs",
    category: "Thermal / Temperature",
    signal: "Analog (milliVolts / Resistance) via MAX6675 / MAX31865",
    principle: "Seebeck Effect: Two dissimilar metals joined at a junction produce a microvolt electrical potential proportional to temperature difference.",
    modules: "K-Type Thermocouple with MAX6675 / MAX31865, PT100, PT1000",
    voltage: "3.3V - 5.0V (module level)",
    range: "-200°C to +1350°C",
    accuracy: "±0.5°C to ±2.0°C depending on calibration class",
    interface: "SPI Digital output from converter IC (or analog bridge)",
    pinout: [
      { pin: "VCC", desc: "3.3V or 5V Power Supply" },
      { pin: "GND", desc: "Ground Connection" },
      { pin: "SCK", desc: "SPI Serial Clock" },
      { pin: "CS",  desc: "Chip Select (Active LOW)" },
      { pin: "SO",  desc: "MISO / Serial Data Out" }
    ],
    codeSnippet: "// Arduino with MAX6675\n#include <max6675.h>\nint ktcSO = 12, ktcCS = 10, ktcCLK = 13;\nMAX6675 ktc(ktcCLK, ktcCS, ktcSO);\nvoid setup() { Serial.begin(9600); }\nvoid loop() {\n  Serial.print(\"C = \");\n  Serial.println(ktc.readCelsius());\n  delay(1000);\n}",
    applications: "High-temperature furnaces, industrial boiler monitoring, 3D printer hotends, engine exhaust sensing."
  },
  "digital-temp": {
    title: "Digital Temperature & Humidity (DHT22 / DS18B20)",
    category: "Thermal / Environmental",
    signal: "Digital (Single-Bus / 1-Wire Protocol)",
    principle: "Capacitive humidity sensing element paired with a negative temperature coefficient (NTC) thermistor or semiconductor bandgap reference.",
    modules: "DHT22 (AM2302), DHT11, DS18B20 (Waterproof probe), SHT31",
    voltage: "3.3V - 5.5V DC",
    range: "Temp: -40°C to 80°C | Humidity: 0% to 100% RH",
    accuracy: "±0.5°C (Temp) | ±2-5% (Humidity)",
    interface: "1-Wire / Custom Single Bus with 4.7kΩ - 10kΩ pull-up resistor",
    pinout: [
      { pin: "VCC", desc: "3.3V to 5V DC Supply" },
      { pin: "DATA", desc: "Bidirectional Serial Data (Requires pull-up resistor to VCC)" },
      { pin: "NC / Pin3", desc: "Not Connected (DHT22 4-pin version)" },
      { pin: "GND", desc: "Power Ground (0V)" }
    ],
    codeSnippet: "// Arduino DHT22\n#include \"DHT.h\"\n#define DHTPIN 2\n#define DHTTYPE DHT22\nDHT dht(DHTPIN, DHTTYPE);\nvoid setup() { dht.begin(); }\nvoid loop() {\n  float h = dht.readHumidity();\n  float t = dht.readTemperature();\n  delay(2000);\n}",
    applications: "Weather stations, greenhouse automation, HVAC climate control, indoor air comfort monitors."
  },
  "infrared-temp": {
    title: "Infrared Non-Contact Pyrometers (MLX90614)",
    category: "Thermal / Optical",
    signal: "Digital (I2C / SMBus)",
    principle: "Stefan-Boltzmann Law: Absorbs infrared radiation emitted by an object onto a thermopile membrane to calculate surface temperature without touch.",
    modules: "MLX90614-DCI (Medical grade), MLX90614-BAA, AMG8833 Grid",
    voltage: "3.3V or 5.0V (model dependent)",
    range: "Ambient: -40°C to +125°C | Object: -70°C to +380°C",
    accuracy: "Up to ±0.2°C in human body temperature range",
    interface: "I2C (Address 0x5A) with pull-up resistors",
    pinout: [
      { pin: "VIN", desc: "3.3V or 5V Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "SCL", desc: "I2C Clock line" },
      { pin: "SDA", desc: "I2C Serial Data line" }
    ],
    codeSnippet: "// Arduino with Adafruit_MLX90614\n#include <Adafruit_MLX90614.h>\nAdafruit_MLX90614 mlx = Adafruit_MLX90614();\nvoid setup() { mlx.begin(); }\nvoid loop() {\n  Serial.println(mlx.readObjectTempC());\n  delay(500);\n}",
    applications: "Contactless forehead thermometers, food safety inspection, rotating machinery diagnostic, electrical switchgear."
  },
  "light-ambient": {
    title: "Light & Optical Sensors (LDR, BH1750, TSL2561)",
    category: "Optical / Radiation",
    signal: "Analog (LDR) or Digital Lux (BH1750 via I2C)",
    principle: "Photoconductivity or photovoltaic conversion: Photons excite charge carriers, lowering resistance or generating photocurrent.",
    modules: "Photoresistor (LDR GL5528), BH1750FVI, TSL2591, OPT3001",
    voltage: "3.3V - 5.0V",
    range: "1 Lux to 65,535 Lux (BH1750 calibrated to human eye)",
    accuracy: "±20% on raw LDR | ±5% on calibrated BH1750",
    interface: "Analog (Voltage Divider) or I2C (0x23 / 0x5C)",
    pinout: [
      { pin: "VCC", desc: "3.3V - 5V DC Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "SCL", desc: "I2C Clock Line" },
      { pin: "SDA", desc: "I2C Data Line" },
      { pin: "ADDR", desc: "Address select pin (Low=0x23, High=0x5C)" }
    ],
    codeSnippet: "// Arduino BH1750 Light Meter\n#include <BH1750.h>\n#include <Wire.h>\nBH1750 lightMeter;\nvoid setup() { Wire.begin(); lightMeter.begin(); }\nvoid loop() {\n  float lux = lightMeter.readLightLevel();\n  Serial.print(\"Light: \"); Serial.println(lux);\n  delay(1000);\n}",
    applications: "Smart streetlights, smartphone automatic screen brightness, agricultural greenhouses, solar panel trackers."
  },
  "motion-pir": {
    title: "PIR (Passive Infrared) Motion Detectors",
    category: "Motion & Presence",
    signal: "Digital High/Low (3.3V Output Pulse)",
    principle: "Pyroelectric effect: Detects changes in ambient infrared radiation emitted by warm moving bodies across Fresnel lens zones.",
    modules: "HC-SR501, AM312 (Mini), RCWL-0516 (Microwave Radar companion)",
    voltage: "4.5V - 20V (HC-SR501) | Output is 3.3V logic friendly",
    range: "Up to 7 meters (120° cone detection angle)",
    accuracy: "Binary presence/motion detection with adjustable delay and sensitivity",
    interface: "Single Digital GPIO Input",
    pinout: [
      { pin: "VCC", desc: "5V - 12V Power input" },
      { pin: "OUT", desc: "Digital Trigger output (3.3V High when motion detected)" },
      { pin: "GND", desc: "Ground Connection" }
    ],
    codeSnippet: "// Arduino PIR Motion Trigger\nconst int pirPin = 7;\nvoid setup() { pinMode(pirPin, INPUT); Serial.begin(9600); }\nvoid loop() {\n  if(digitalRead(pirPin) == HIGH){\n    Serial.println(\"Motion Detected!\");\n  }\n  delay(200);\n}",
    applications: "Burglar alarms, automated bathroom/corridor lighting, smart energy saving appliances, wild animal cameras."
  },
  "imu-accelerometer": {
    title: "6-DoF / 9-DoF IMU & Accelerometers (MPU6050 / BNO055)",
    category: "Inertial & Navigation",
    signal: "Digital (I2C / SPI)",
    principle: "MEMS (Micro-Electro-Mechanical Systems): Microscopic silicon proof masses deflect under acceleration or Coriolis forces, altering capacitance.",
    modules: "MPU6050 (3-axis Accel + 3-axis Gyro), ADXL345, BNO055 (Absolute Orientation with sensor fusion)",
    voltage: "3.3V - 5.0V (on-board voltage regulator)",
    range: "Accel: ±2g, ±4g, ±8g, ±16g | Gyro: ±250 to ±2000°/sec",
    accuracy: "16-bit ADC resolution per axis",
    interface: "I2C (0x68 / 0x69) or SPI",
    pinout: [
      { pin: "VCC", desc: "3.3V - 5V Power" },
      { pin: "GND", desc: "Ground" },
      { pin: "SCL", desc: "I2C Serial Clock" },
      { pin: "SDA", desc: "I2C Serial Data" },
      { pin: "INT", desc: "Programmable Interrupt Pin" }
    ],
    codeSnippet: "// Arduino MPU6050\n#include <Adafruit_MPU6050.h>\nAdafruit_MPU6050 mpu;\nvoid setup() { mpu.begin(); }\nvoid loop() {\n  sensors_event_t a, g, temp;\n  mpu.getEvent(&a, &g, &temp);\n  Serial.print(\"Accel X: \"); Serial.println(a.acceleration.x);\n  delay(100);\n}",
    applications: "Drone stabilization, smartphone orientation rotation, robotics balancing, wearable step counters, crash detection."
  },
  "proximity-ultrasonic": {
    title: "Ultrasonic Distance & Ranging (HC-SR04)",
    category: "Proximity & Distance",
    signal: "Digital Echo Pulse (Pulse Width modulation)",
    principle: "Echolocation / Time-of-Flight: Emits an ultrasonic 40kHz sound burst and measures the round-trip flight duration to the reflective object.",
    modules: "HC-SR04, US-015, RCWL-1601 (3.3V compatible), JSN-SR04T (Waterproof)",
    voltage: "5.0V DC (standard HC-SR04) or 3.3-5V (RCWL-1601)",
    range: "2 cm to 400 cm (non-contact)",
    accuracy: "±3 mm resolution under normal air conditions",
    interface: "Trigger Pin (10µs TTL pulse) & Echo Pin (Pulse-in duration)",
    pinout: [
      { pin: "VCC", desc: "5V Power Supply" },
      { pin: "TRIG", desc: "Trigger Input (Send 10us High pulse)" },
      { pin: "ECHO", desc: "Echo Output (High duration = sound travel time)" },
      { pin: "GND", desc: "Ground Connection" }
    ],
    codeSnippet: "// HC-SR04 Range Finder\nconst int trig = 9, echo = 10;\nvoid setup() { pinMode(trig, OUTPUT); pinMode(echo, INPUT); }\nvoid loop() {\n  digitalWrite(trig, LOW); delayMicroseconds(2);\n  digitalWrite(trig, HIGH); delayMicroseconds(10);\n  digitalWrite(trig, LOW);\n  long duration = pulseIn(echo, HIGH);\n  float distanceCm = duration * 0.034 / 2;\n  Serial.println(distanceCm);\n  delay(300);\n}",
    applications: "Robot obstacle avoidance, smart parking distance assist, automated water tank level measurement, liquid dispenser."
  },
  "tof-laser": {
    title: "Laser Time-of-Flight (ToF) Distance (VL53L0X / VL53L1X)",
    category: "Proximity & Optical",
    signal: "Digital (I2C Protocol)",
    principle: "Flight-time of invisible 940nm VCSEL photon pulses: Measures the exact time taken by light to reflect back regardless of target color or reflectance.",
    modules: "VL53L0X (up to 2m), VL53L1X (up to 4m), TF-Luna LiDAR",
    voltage: "2.8V - 5.0V (on-board regulator)",
    range: "30 mm to 2000 mm (VL53L0X) | Up to 4000 mm (VL53L1X)",
    accuracy: "Millimeter-level precision (±3%)",
    interface: "I2C (0x29 default, reconfigurable)",
    pinout: [
      { pin: "VIN", desc: "3.3V - 5V DC Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "SCL", desc: "I2C Clock line" },
      { pin: "SDA", desc: "I2C Data line" },
      { pin: "XSHUT", desc: "Hardware shutdown / enable pin" }
    ],
    codeSnippet: "// Arduino VL53L0X ToF\n#include <Adafruit_VL53L0X.h>\nAdafruit_VL53L0X lox = Adafruit_VL53L0X();\nvoid setup() { lox.begin(); }\nvoid loop() {\n  VL53L0X_RangingMeasurementData_t measure;\n  lox.rangingTest(&measure, false);\n  if (measure.RangeStatus != 4) Serial.println(measure.RangeMilliMeter);\n  delay(100);\n}",
    applications: "Camera autofocus assist, robotic gesture recognition, autonomous drone hover height, smart sanitary touchless taps."
  },
  "pressure-barometric": {
    title: "Barometric Pressure & Altimeter (BMP280 / BME280)",
    category: "Pressure & Environmental",
    signal: "Digital (I2C or SPI)",
    principle: "Piezoresistive MEMS diaphragm: Atmospheric pressure flexes silicon diaphragm, altering resistance measured by internal precision ADC.",
    modules: "BMP280 (Pressure + Temp), BME280 (Pressure + Temp + Humidity), DPS310",
    voltage: "1.8V - 3.6V (modules include 3.3V/5V LDO)",
    range: "300 hPa to 1100 hPa (Equiv to +9000m to -500m altitude)",
    accuracy: "±1 hPa absolute (±1 meter relative altitude calculation)",
    interface: "I2C (0x76 or 0x77) or 4-wire SPI",
    pinout: [
      { pin: "VCC", desc: "3.3V or 5V Power" },
      { pin: "GND", desc: "Ground (0V)" },
      { pin: "SCL", desc: "I2C SCL / SPI Clock" },
      { pin: "SDA", desc: "I2C SDA / SPI MOSI" },
      { pin: "CSB", desc: "Chip Select (High for I2C, Low for SPI)" },
      { pin: "SDO", desc: "I2C Address Select / SPI MISO" }
    ],
    codeSnippet: "// Arduino BMP280\n#include <Adafruit_BMP280.h>\nAdafruit_BMP280 bmp;\nvoid setup() { bmp.begin(0x76); }\nvoid loop() {\n  Serial.print(\"Pressure: \"); Serial.print(bmp.readPressure() / 100.0F);\n  Serial.print(\" hPa | Altitude: \"); Serial.println(bmp.readAltitude(1013.25));\n  delay(1000);\n}",
    applications: "Drone altitude holding, smartphone indoor floor elevation, weather barographs, smart watches."
  },
  "force-loadcell": {
    title: "Strain Gauge & Weight Load Cells (HX711)",
    category: "Force & Mechanical",
    signal: "Analog Bridge Amplified to 24-bit Digital (HX711)",
    principle: "Piezoresistive Wheatstone Bridge: Mechanical force or weight deforms aluminum load cell beam, altering micro-strain resistance.",
    modules: "Strain Gauge Load Cell (1kg, 5kg, 20kg, 50kg, 200kg) + HX711 24-bit ADC",
    voltage: "2.7V - 5.5V DC",
    range: "From grams up to metric tons depending on load cell rating",
    accuracy: "24-bit precision (<0.05% error when calibrated)",
    interface: "Two-wire proprietary digital bit-bang interface (PD_SCK & DOUT)",
    pinout: [
      { pin: "VCC", desc: "5V Power Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "DT", desc: "Serial Data Output" },
      { pin: "SCK", desc: "Serial Clock Input" }
    ],
    codeSnippet: "// Arduino HX711 Weight Scale\n#include \"HX711.h\"\nHX711 scale;\nvoid setup() { scale.begin(4, 5); scale.set_scale(2280.f); scale.tare(); }\nvoid loop() {\n  Serial.print(scale.get_units(5), 2); Serial.println(\" kg\");\n  delay(500);\n}",
    applications: "Digital weighing scales, industrial hoppers, payload monitoring, material testing, inventory monitoring bins."
  },
  "gas-airquality": {
    title: "Gas & Air Quality Sensors (MQ Series & MQ-135)",
    category: "Gas & Chemical",
    signal: "Analog Voltage + Digital Comparator Threshold Output",
    principle: "Chemiresistor (SnO2 semiconductor): In clean air, conductivity is low. In presence of target gases, oxygen ions react, lowering resistance.",
    modules: "MQ-2 (Smoke/LPG), MQ-135 (Air Quality/CO2/NH3), MQ-7 (Carbon Monoxide), MQ-3 (Alcohol)",
    voltage: "5.0V DC (Internal heater requires steady 5V ~150mA)",
    range: "10 to 10,000 ppm gas concentration",
    accuracy: "Qualitative / semi-quantitative indicator (requires pre-heating burn-in)",
    interface: "Analog Output (A0) to ADC pin & Digital Output (D0) with potentiometer",
    pinout: [
      { pin: "VCC", desc: "5V DC Steady Power (Heater coil supply)" },
      { pin: "GND", desc: "Ground (0V)" },
      { pin: "D0", desc: "Digital Trigger output (Adjustable threshold via onboard pot)" },
      { pin: "A0", desc: "Analog Voltage proportional to gas concentration" }
    ],
    codeSnippet: "// Arduino MQ Gas Read\nconst int mqPin = A0;\nvoid setup() { Serial.begin(9600); }\nvoid loop() {\n  int val = analogRead(mqPin);\n  Serial.print(\"Air Quality raw: \"); Serial.println(val);\n  delay(1000);\n}",
    applications: "Kitchen gas leak alarms, smoke warning systems, breathalyzers, factory toxic gas monitors, smart air purifiers."
  },
  "soil-moisture": {
    title: "Soil Moisture & Water Level (Capacitive & Resistive)",
    category: "Environmental & Agriculture",
    signal: "Analog Voltage (0V to 3.0V)",
    principle: "Capacitance variation (Capacitive v1.2): Soil water content acts as a dielectric between PCB copper traces, preventing electrolysis corrosion.",
    modules: "Capacitive Soil Moisture Sensor v1.2, Resistive Probe, Raindrop Sensor PCB",
    voltage: "3.3V - 5.0V DC",
    range: "0% (completely dry air) to 100% (submerged in water)",
    accuracy: "Repeatable analog curve resistant to oxidation",
    interface: "Single Analog Output (AOUT) to MCU ADC",
    pinout: [
      { pin: "VCC", desc: "3.3V or 5V Power" },
      { pin: "GND", desc: "Ground" },
      { pin: "AOUT", desc: "Analog Voltage Output (Higher voltage = drier soil)" }
    ],
    codeSnippet: "// Arduino Soil Moisture\nconst int soilPin = A1;\nvoid setup() { Serial.begin(9600); }\nvoid loop() {\n  int reading = analogRead(soilPin);\n  // Map calibration values\n  int moisture = map(reading, 700, 300, 0, 100);\n  Serial.print(\"Moisture: \"); Serial.print(moisture); Serial.println(\"%\");\n  delay(2000);\n}",
    applications: "Smart automated drip irrigation, indoor potted plant monitors, precision farming, greenhouse hydrology."
  },
  "biomedical-pulse": {
    title: "Biomedical Pulse Oximeter & Heart Rate (MAX30102)",
    category: "Biomedical & Health",
    signal: "Digital (I2C Protocol)",
    principle: "Photoplethysmography (PPG): Red (660nm) and Infrared (880nm) LEDs illuminate capillary tissue. Oxygenated vs deoxygenated blood absorbs wavelengths differently.",
    modules: "MAX30102, MAX30100, AD8232 (ECG Heart monitor)",
    voltage: "1.8V Core, 3.3V/5V I/O",
    range: "Heart Rate: 30 to 220 BPM | SpO2: 70% to 100%",
    accuracy: "Clinical evaluation grade when motion artifacts are filtered",
    interface: "I2C (0x57 address) + Interrupt pin",
    pinout: [
      { pin: "VIN", desc: "3.3V - 5V Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "SCL", desc: "I2C Clock line" },
      { pin: "SDA", desc: "I2C Data line" },
      { pin: "INT", desc: "Sample Ready Interrupt output" }
    ],
    codeSnippet: "// Arduino MAX30102\n#include <Wire.h>\n#include \"MAX30105.h\"\nMAX30105 particleSensor;\nvoid setup() { particleSensor.begin(Wire, I2C_SPEED_FAST); particleSensor.setup(); }\nvoid loop() {\n  long irValue = particleSensor.getIR();\n  Serial.println(irValue);\n  delay(20);\n}",
    applications: "Fitness bands, hospital patient monitors, remote telemedicine devices, sleep apnea screening."
  },
  "sound-acoustic": {
    title: "Acoustic & Sound Sensors (Microphone Modules)",
    category: "Sound & Acoustics",
    signal: "Analog Audio Waveform + Digital Clap Comparator",
    principle: "Electret Condenser or MEMS diaphragm: Sound pressure waves vibrate a flexible plate across a fixed backplate, generating microvolt audio signals.",
    modules: "KY-038 Sound Module, MAX9814 (Auto Gain Control), MAX4466, INMP441 (I2S Digital MEMS)",
    voltage: "3.3V - 5.0V DC",
    range: "20 Hz to 20 kHz (Audio band), 40 dB to 120 dB SPL",
    accuracy: "High sensitivity with onboard adjustable gain trim potentiometer",
    interface: "Analog Out (raw waveform) & Digital Out (threshold trigger)",
    pinout: [
      { pin: "VCC", desc: "3.3V to 5V Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "DO",  desc: "Digital Trigger (High/Low on sound spike)" },
      { pin: "AO",  desc: "Analog sound envelope amplitude" }
    ],
    codeSnippet: "// Clap switch Arduino\nconst int soundPin = 8;\nvoid setup() { pinMode(soundPin, INPUT); pinMode(LED_BUILTIN, OUTPUT); }\nvoid loop() {\n  if(digitalRead(soundPin) == HIGH){\n    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));\n    delay(500); // debounce\n  }\n}",
    applications: "Clap-activated smart switches, noise pollution monitoring, voice recognition trigger, acoustic shot detection."
  },
  "magnetic-hall": {
    title: "Magnetic Field & Hall Effect Sensors",
    category: "Magnetic & Navigation",
    signal: "Digital Switch (Hall 3144) or Analog Linear (SS49E / HMC5883L)",
    principle: "Hall Effect: Lorentz force deflects charge carriers in a current-carrying conductor when exposed to perpendicular magnetic flux, producing a Hall voltage.",
    modules: "A3144 Hall Switch, SS49E Linear Hall, HMC5883L / QMC5883L (3-Axis Digital Compass)",
    voltage: "3.0V - 5.5V DC",
    range: "±1 to ±8 Gauss (Compass) | Up to 1000 Gauss for speed pickup",
    accuracy: "1° to 2° magnetic heading accuracy (compass)",
    interface: "Digital Open-Collector or I2C (Compass)",
    pinout: [
      { pin: "VCC", desc: "3.3V - 5V DC Supply" },
      { pin: "GND", desc: "Ground" },
      { pin: "OUT / SCL", desc: "Digital/Analog output or I2C Clock" },
      { pin: "SDA", desc: "I2C Data (Compass modules only)" }
    ],
    codeSnippet: "// RPM Counter using Hall Effect\nvolatile int revs = 0;\nvoid rpm_counter() { revs++; }\nvoid setup() {\n  attachInterrupt(digitalPinToInterrupt(2), rpm_counter, FALLING);\n}\nvoid loop() { delay(1000); Serial.println(revs * 60); revs = 0; }",
    applications: "Brushless motor commutation, bicycle speedometer, door security contact switches, electronic navigation compass."
  }
};

// Open Spec Modal
const specModal = document.querySelector("#sensor-spec-modal");
if(specModal){
  const titleEl = document.querySelector("#spec-modal-title");
  const catEl = document.querySelector("#spec-modal-cat");
  const principleEl = document.querySelector("#spec-modal-principle");
  const modulesEl = document.querySelector("#spec-modal-modules");
  const voltageEl = document.querySelector("#spec-modal-voltage");
  const rangeEl = document.querySelector("#spec-modal-range");
  const accuracyEl = document.querySelector("#spec-modal-accuracy");
  const interfaceEl = document.querySelector("#spec-modal-interface");
  const appEl = document.querySelector("#spec-modal-apps");
  const pinListEl = document.querySelector("#spec-modal-pinouts");
  const codeEl = document.querySelector("#spec-modal-code");

  document.querySelectorAll("[data-spec-key]").forEach(trigger=>{
    trigger.addEventListener("click",()=>{
      const key = trigger.dataset.specKey;
      const data = sensorSpecCatalog[key];
      if(!data) return;
      if(titleEl) titleEl.textContent = data.title;
      if(catEl) catEl.textContent = `${data.category} · ${data.signal}`;
      if(principleEl) principleEl.textContent = data.principle;
      if(modulesEl) modulesEl.textContent = data.modules;
      if(voltageEl) voltageEl.textContent = data.voltage;
      if(rangeEl) rangeEl.textContent = data.range;
      if(accuracyEl) accuracyEl.textContent = data.accuracy;
      if(interfaceEl) interfaceEl.textContent = data.interface;
      if(appEl) appEl.textContent = data.applications;
      if(codeEl) codeEl.textContent = data.codeSnippet;

      if(pinListEl){
        pinListEl.innerHTML = "";
        data.pinout.forEach(p=>{
          const li = document.createElement("li");
          li.innerHTML = `<span>${p.pin}</span> <div>${p.desc}</div>`;
          pinListEl.appendChild(li);
        });
      }

      specModal.hidden = false;
      const closeBtn = specModal.querySelector(".modal-close");
      if(closeBtn) closeBtn.focus();
    });
  });
}

// Contact form placeholder handler
const contactForm=document.querySelector("#contact-form");
if(contactForm){
  contactForm.addEventListener("submit",event=>{
    event.preventDefault();
    const status=document.querySelector("#form-status");
    if(status){
      status.textContent="Thanks! Your message form is ready to connect to a backend or form service.";
    }
    event.target.reset();
  });
}

// -------------------------------------------------------------
// Interactive Innovation Page Logic (Blueprints & Idea Generator)
// -------------------------------------------------------------
const blueprintFilterBtns = document.querySelectorAll(".blueprint-filter-btn");
const blueprintCards = document.querySelectorAll(".blueprint-card");
if(blueprintFilterBtns.length > 0){
  blueprintFilterBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      blueprintFilterBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const sector = btn.dataset.sector || "all";
      blueprintCards.forEach(card=>{
        const matches = sector === "all" || card.dataset.sector === sector;
        card.hidden = !matches;
      });
    });
  });
}

// Innovation Ideas Knowledge Base for Interactive Widget
const innovationIdeasDB = {
  "agri": {
    "moisture": {
      title: "LoRaWAN AI Precision Drip Irrigation & Soil Salinity Network",
      challenge: "Over-irrigation leaches nutrients and wastes up to 40% of fresh groundwater in farming regions.",
      solution: "Deploy capacitive soil moisture arrays and EC electrical conductivity probes interfaced to an ESP32 LoRa node to calculate crop transpiration indices and trigger solenoid valves automatically.",
      hardware: "Capacitive Soil Probe v1.2, Soil EC probe, ESP32 LoRa, 12V Solenoid Valve",
      software: "FreeRTOS sleep cycling, MQTT telemetry, soil water depletion algorithms",
      impact: "Reduces farm water usage by 35-45% while boosting crop yield by 18%."
    },
    "optical": {
      title: "Drone-Mounted Multispectral Crop Health & NDVI Scanner",
      challenge: "Fungal diseases and pest infestations ruin up to 25% of crops before visible symptoms appear.",
      solution: "Multispectral optical sensors (NIR 850nm + Red 660nm) calculate Normalized Difference Vegetation Index (NDVI) to detect cellular chlorophyll stress days in advance.",
      hardware: "AS7263 NIR Spectral Sensor, Raspberry Pi Zero 2W, GPS Module, Camera",
      software: "Python OpenCV, NDVI false-color map generation, autonomous flight telemetry",
      impact: "Enables targeted pesticide application, lowering chemical runoff by 60%."
    },
    "gas": {
      title: "Grain Silo Ethylene & Spoilage Early Warning Node",
      challenge: "Post-harvest grain spoilage causes billions in lost revenue due to hidden moisture pockets and mold.",
      solution: "Gas and humidity sensor clusters monitor ethylene and CO2 spikes produced by anaerobic mold metabolism in silos.",
      hardware: "MQ-135 Gas Sensor, SHT31 Temp/Humidity, ESP32, Solar Harvester",
      software: "Exponential moving average thresholding, GSM SMS alert gateway",
      impact: "Prevents grain mass rotting and saves smallholder farmer harvests."
    },
    "temperature": {
      title: "Solar Cold-Storage Thermal Stratification Controller",
      challenge: "Perishable produce rots quickly if rural cold rooms have temperature unevenness.",
      solution: "Multi-point waterproof DS18B20 digital temperature bus dynamically steers brushless DC fans to homogenize cold air distribution.",
      hardware: "DS18B20 1-Wire Bus, Solid State Relays, BLDC Air Circulators",
      software: "PID thermal gradient equalization loop, Arduino C++",
      impact: "Extends vegetable shelf life by 3 weeks with zero grid power."
    }
  },
  "health": {
    "biomedical": {
      title: "Continuous Multiparameter ICU-at-Home Telehealth Patch",
      challenge: "Post-surgery patients often relapse undetected after hospital discharge.",
      solution: "Skin-adhered flexible patch integrating PPG optical pulse oximetry, single-lead ECG, and skin thermistor transmitting encrypted vitals via BLE.",
      hardware: "MAX30102 PPG, AD8232 ECG, NTC thermistor, nRF52840 BLE SoC",
      software: "Pan-Tompkins QRS peak detection, SpO2 R-curve calculation, BLE Health Device Profile",
      impact: "Cuts hospital readmission rates by 32% and alerts emergency contacts instantly."
    },
    "motion": {
      title: "Wearable Elder Fall-Detector with Barometric Altitude Fusion",
      challenge: "Fall-related trauma in elderly individuals is compounded by hours spent immobile on the floor.",
      solution: "Fuses 6-axis IMU sudden impact vectors with barometric pressure height drop (BMP280) to detect falls and eliminate false positives from sitting down.",
      hardware: "MPU6050 Accelerometer/Gyro, BMP280 Barometer, ESP32-C3, Buzzer",
      software: "Sensor fusion complementary filter, SVM acceleration threshold classifier",
      impact: "Sub-500ms fall detection with automated GPS SOS dispatch."
    },
    "pressure": {
      title: "Smart Wheelchair Pressure-Ulcer Prevention Matrix",
      challenge: "Paraplegic and bedridden patients suffer painful, dangerous tissue necrosis (decubitus ulcers).",
      solution: "A 32x32 piezoresistive pressure mat maps contact pressure hotspots over time and buzzes to prompt patient repositioning or auto-inflates pneumatic cells.",
      hardware: "Velostat piezoresistive array, 74HC4067 multiplexers, STM32 MCU",
      software: "Matrix scanning heat-map renderer, cumulative pressure timer",
      impact: "Eliminates stage 3-4 pressure ulcers in long-term rehabilitation wards."
    }
  },
  "city": {
    "proximity": {
      title: "Smart Ultrasonic Garbage Bin Fill-Level & Route Optimizer",
      challenge: "Municipal trucks burn thousands of liters of fuel emptying half-empty trash cans.",
      solution: "Solar-powered ToF/Ultrasonic sensor mounted on bin lids beams fill percentages and tilt statuses to city fleet dashboards.",
      hardware: "JSN-SR04T Waterproof Ultrasonic, SIM800L GSM/NB-IoT, Solar supercapacitor",
      software: "Dijkstra dynamic garbage route recalculation, Cloud API webhook",
      impact: "Reduces municipal fleet fuel consumption and urban carbon emissions by 28%."
    },
    "optical": {
      title: "Adaptive Traffic-Responsive Smart Streetlight Mesh",
      challenge: "Conventional streetlights waste up to 40% of municipal electrical budgets burning at 100% on empty roads.",
      solution: "PIR motion and ambient light sensors talk across an ESP-NOW wireless mesh to brighten lights only when approaching vehicles or pedestrians are sensed.",
      hardware: "BH1750 Ambient Light, RCWL-0516 Microwave Radar, ESP32, Dimmer Triac",
      software: "ESP-NOW self-healing mesh protocol, progressive dimming curve",
      impact: "Saves 65% municipal electricity while maintaining 100% pedestrian night safety."
    },
    "motion": {
      title: "Crowdsourced Pothole & Road Surface Quality Profiler",
      challenge: "Unreported potholes cause severe vehicular accidents and costly suspension damages.",
      solution: "Dash-mounted or bus-mounted 3-axis IMUs detect sharp Z-axis vertical g-force shocks and geo-tag potholes automatically to city public works.",
      hardware: "ADXL345 High-g Accelerometer, NEO-6M GPS, Raspberry Pi Pico",
      software: "Z-score anomaly shock detection, OpenStreetMap road overlay",
      impact: "Enables rapid road maintenance before potholes expand during monsoons."
    }
  },
  "industry": {
    "motion": {
      title: "Predictive Bearing Vibration & Motor Fault Analyzer",
      challenge: "Unscheduled industrial motor breakdowns halt production lines costing thousands of dollars per hour.",
      solution: "High-bandwidth MEMS accelerometers analyze FFT vibration spectrums on motor bearing housings to identify imbalance and bearing pitting weeks before catastrophic seizure.",
      hardware: "ADXL355 High-Frequency Accel, ESP32, RS485 Modbus Transceiver",
      software: "Fast Fourier Transform (FFT) on-edge vibration envelope peak analysis",
      impact: "Prevents catastrophic motor burnouts and transitions plants to predictive maintenance."
    },
    "pressure": {
      title: "Smart Water & Oil Pipeline Acoustic Transient Leak Detector",
      challenge: "Underground pipeline bursts lose up to 30% of municipal treated water before leaks surface.",
      solution: "High-frequency piezoresistive pressure transducers measure water hammer waves and acoustic propagation to locate pipe leaks down to within 10 meters.",
      hardware: "Industrial 4-20mA Pressure Transmitter, ADS1115 16-bit ADC, Cellular RTU",
      software: "Negative Pressure Wave (NPW) arrival time difference algorithm",
      impact: "Saves millions of liters of potable water and stops structural erosion."
    }
  },
  "eco": {
    "gas": {
      title: "Autonomous Forest Fire Smoke & Pyrolysis Early Warning Mesh",
      challenge: "By the time satellite thermal imagery spots a wildfire, it has already engulfed entire square miles.",
      solution: "Tree-mounted sensor pods monitor sudden spikes in carbon monoxide, VOCs, and micro-climate temperature jumps, beaming alerts via satellite/LoRa.",
      hardware: "BME680 Environmental Sensor, MQ-7 CO Sensor, LoRaWAN SX1262 Node",
      software: "Forest fire index (FFI) algorithm, ultra-low-power duty cycle (10-year battery)",
      impact: "Detects forest floor smoldering in under 15 minutes, enabling rapid containment."
    },
    "optical": {
      title: "Solar Water River Turbidity & Chemical Runoff Monitor",
      challenge: "Industrial effluent discharges into rivers frequently go undetected during night hours.",
      solution: "Floating buoy equipped with optical turbidity sensors, pH probe, and dissolved oxygen sensor logs continuous water health to an open public ledger.",
      hardware: "Optical Turbidity Sensor, Glass Electrode pH Probe, ESP32, Solar Panel",
      software: "Moving average water contamination scoring, automated Telegram river alert bot",
      impact: "Holds polluters accountable with tamper-proof real-time water data."
    }
  },
  "assist": {
    "proximity": {
      title: "Third-Eye Smart Vision Cane for Visually Impaired Persons",
      challenge: "Traditional white canes cannot detect chest-level obstacles like tree branches or open truck beds.",
      solution: "Dual ToF laser rangefinders and ultrasonic transducers detect low and high hazards, providing distinct haptic vibration pulses and bone-conduction voice cues.",
      hardware: "VL53L0X Time-of-Flight, HC-SR04 Ultrasonic, Coin Vibration Motor, ATmega328P",
      software: "Haptic distance frequency modulator, obstacle prioritization state machine",
      impact: "Provides full 3D spatial awareness, granting independent mobility to blind users."
    },
    "motion": {
      title: "Sign Language Gesture-to-Speech Smart Glove",
      challenge: "Mute and deaf individuals face severe communication barriers in day-to-day public interactions.",
      solution: "Flexible resistive bend sensors on fingers paired with an MPU6050 on the wrist translate finger flexion and hand motions into spoken words via text-to-speech.",
      hardware: "5x 2.2-inch Flex Bend Sensors, MPU6050 IMU, ESP32 with DAC audio out / BLE",
      software: "K-Nearest Neighbors (KNN) gesture recognition classifier, Android TTS integration",
      impact: "Enables natural fluid conversation between deaf individuals and non-signers."
    }
  },
  "home": {
    "temperature": {
      title: "Occupancy-Aware Multi-Zone Smart HVAC Damper System",
      challenge: "Central air conditioning heats and cools unoccupied bedrooms all day, spiking electricity bills.",
      solution: "Room-by-room PIR and DHT22 sensors actuate motorized duct dampers to direct heating/cooling only into occupied zones.",
      hardware: "DHT22 Sensor, HC-SR501 PIR, SG90 Servo Actuators, ESP32",
      software: "Zone thermal balancing PID loop, Home Assistant MQTT integration",
      impact: "Lowers residential HVAC utility bills by up to 28% year-round."
    },
    "proximity": {
      title: "Automatic Main Water Leak Detection & Auto-Shutoff Ball Valve",
      challenge: "Hidden plumbing leaks and pipe bursts cause catastrophic home flooding while owners are away.",
      solution: "Capacitive water drop sensors placed near heaters and sinks communicate with a motorized brass ball valve on the main supply to instantly cut water when moisture is sensed.",
      hardware: "Capacitive Water Sensor, 12V Motorized Brass Ball Valve, Relay Module, ESP8266",
      software: "Failsafe interrupt routine, push notification to homeowner phone",
      impact: "Completely prevents costly residential water damage disasters."
    }
  }
};

const genDomainSelect = document.querySelector("#gen-domain-select");
const genSensorSelect = document.querySelector("#gen-sensor-select");
const genSubmitBtn = document.querySelector("#gen-submit-btn");

const genTitleEl = document.querySelector("#gen-title");
const genChallengeEl = document.querySelector("#gen-challenge");
const genSolutionEl = document.querySelector("#gen-solution");
const genHardwareEl = document.querySelector("#gen-hardware");
const genSoftwareEl = document.querySelector("#gen-software");
const genImpactEl = document.querySelector("#gen-impact");

const updateGeneratedIdea = () => {
  if(!genDomainSelect || !genSensorSelect || !genTitleEl) return;
  const domain = genDomainSelect.value;
  const sensor = genSensorSelect.value;

  const domainGroup = innovationIdeasDB[domain] || innovationIdeasDB["agri"];
  let idea = domainGroup[sensor];

  if(!idea){
    const keys = Object.keys(domainGroup);
    idea = domainGroup[keys[0]];
  }

  if(idea){
    genTitleEl.textContent = idea.title;
    if(genChallengeEl) genChallengeEl.textContent = idea.challenge;
    if(genSolutionEl) genSolutionEl.textContent = idea.solution;
    if(genHardwareEl) genHardwareEl.textContent = idea.hardware;
    if(genSoftwareEl) genSoftwareEl.textContent = idea.software;
    if(genImpactEl) genImpactEl.textContent = idea.impact;
  }
};

if(genSubmitBtn){
  genSubmitBtn.addEventListener("click", updateGeneratedIdea);
}
if(genDomainSelect){
  genDomainSelect.addEventListener("change", updateGeneratedIdea);
}
if(genSensorSelect){
  genSensorSelect.addEventListener("change", updateGeneratedIdea);
}

// -------------------------------------------------------------
// Interactive Learning: Sensor Characteristics Calculators
// -------------------------------------------------------------
const calcTabBtns = document.querySelectorAll(".calc-tab-btn");
const calcPanes = document.querySelectorAll(".calc-pane");

if(calcTabBtns.length > 0){
  calcTabBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      calcTabBtns.forEach(b=>b.classList.remove("active"));
      calcPanes.forEach(p=>p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.querySelector(`#${btn.dataset.calc}`);
      if(target) target.classList.add("active");
    });
  });
}

// 1. ADC Resolution Calculator
const adcVref = document.querySelector("#adc-vref");
const adcBits = document.querySelector("#adc-bits");
const adcMin = document.querySelector("#adc-range-min");
const adcMax = document.querySelector("#adc-range-max");
const adcLsbRes = document.querySelector("#res-adc-lsb");
const adcPhysicalRes = document.querySelector("#res-adc-physical");
const adcLevels = document.querySelector("#res-adc-levels");
const adcNoise = document.querySelector("#res-adc-noise");

const updateAdcCalc = () => {
  if(!adcVref || !adcBits || !adcLsbRes) return;
  const vref = parseFloat(adcVref.value) || 5.0;
  const bits = parseInt(adcBits.value, 10) || 10;
  const minVal = parseFloat(adcMin.value) || 0;
  const maxVal = parseFloat(adcMax.value) || 100;

  const totalLevels = Math.pow(2, bits);
  const vLsb = (vref / totalLevels) * 1000; // in mV
  const span = Math.max(0.0001, maxVal - minVal);
  const physicalStep = span / totalLevels;

  let lsbFormatted = vLsb >= 1 ? `${vLsb.toFixed(3)} mV` : `${(vLsb * 1000).toFixed(2)} µV`;
  adcLsbRes.textContent = lsbFormatted;
  if(adcPhysicalRes) adcPhysicalRes.textContent = `${physicalStep < 0.001 ? physicalStep.toExponential(3) : physicalStep.toFixed(4)} units / LSB`;
  if(adcLevels) adcLevels.textContent = totalLevels.toLocaleString() + " discrete steps";
  if(adcNoise) adcNoise.textContent = `± ${(vLsb / 2).toFixed(3)} mV`;
};

[adcVref, adcBits, adcMin, adcMax].forEach(el=>{
  if(el) el.addEventListener("input", updateAdcCalc);
});
updateAdcCalc();

// 2. Sensitivity & Voltage Output Calculator
const sensSlope = document.querySelector("#sens-slope");
const sensOffset = document.querySelector("#sens-offset");
const sensInputVal = document.querySelector("#sens-input-val");
const sensOutV = document.querySelector("#res-sens-voltage");
const sensFullSpan = document.querySelector("#res-sens-span");

const updateSensCalc = () => {
  if(!sensSlope || !sensOffset || !sensOutV) return;
  const slope = parseFloat(sensSlope.value) || 10; // mV per unit
  const offset = parseFloat(sensOffset.value) || 0; // Volts
  const val = parseFloat(sensInputVal.value) || 25; // units

  const vOut = offset + (slope * val) / 1000;
  sensOutV.textContent = `${vOut.toFixed(4)} V`;
  if(sensFullSpan) sensFullSpan.textContent = `${(vOut * 1000).toFixed(1)} mV total output`;
};

[sensSlope, sensOffset, sensInputVal].forEach(el=>{
  if(el) el.addEventListener("input", updateSensCalc);
});
updateSensCalc();

// 3. First-Order Time Constant (Tau) Calculator
const tauSeconds = document.querySelector("#tau-seconds");
const tauInitial = document.querySelector("#tau-initial");
const tauFinal = document.querySelector("#tau-final");
const tauResTime = document.querySelector("#res-tau-settled");
const tau1Val = document.querySelector("#res-tau-1");
const tau2Val = document.querySelector("#res-tau-2");
const tau3Val = document.querySelector("#res-tau-3");
const tau5Val = document.querySelector("#res-tau-5");

const updateTauCalc = () => {
  if(!tauSeconds || !tauInitial || !tauFinal || !tauResTime) return;
  const tau = parseFloat(tauSeconds.value) || 2.0;
  const init = parseFloat(tauInitial.value) || 25;
  const fin = parseFloat(tauFinal.value) || 100;
  const delta = fin - init;

  const t1 = init + delta * (1 - Math.exp(-1));
  const t2 = init + delta * (1 - Math.exp(-2));
  const t3 = init + delta * (1 - Math.exp(-3));
  const t5 = init + delta * (1 - Math.exp(-5));

  tauResTime.textContent = `${(tau * 5).toFixed(2)} s`;
  if(tau1Val) tau1Val.textContent = `${t1.toFixed(2)} units (63.2%) at ${(tau * 1).toFixed(1)}s`;
  if(tau2Val) tau2Val.textContent = `${t2.toFixed(2)} units (86.5%) at ${(tau * 2).toFixed(1)}s`;
  if(tau3Val) tau3Val.textContent = `${t3.toFixed(2)} units (95.0%) at ${(tau * 3).toFixed(1)}s`;
  if(tau5Val) tau5Val.textContent = `${t5.toFixed(2)} units (99.3%) at ${(tau * 5).toFixed(1)}s`;
};

[tauSeconds, tauInitial, tauFinal].forEach(el=>{
  if(el) el.addEventListener("input", updateTauCalc);
});
updateTauCalc();

// -------------------------------------------------------------
// Interactive Projects: "Dissect a System" Explorer
// -------------------------------------------------------------
const dissectData = {
  "auto": {
    name: "Modern Electric / Connected Vehicle",
    subsystems: {
      "powertrain": {
        title: "EV Powertrain & Battery Management (BMS)",
        criticality: "Safety-Critical (ASIL-D)",
        protocol: "High-Speed CAN-FD / IsoSPI",
        desc: "Monitors thousands of lithium-ion cells in real-time to prevent thermal runaway, calculate remaining range, and regulate regenerative braking torque.",
        sensors: [
          { name: "Cell-Level NTC Thermistor Arrays", role: "Measures localized thermal spikes across battery modules (±0.5°C)" },
          { name: "Fluxgate / Hall Current Transducer", role: "Reads up to ±1000A DC battery current for Coulomb-counting SOC estimation" },
          { name: "Motor Rotor Resolver / Hall Encoder", role: "High-speed angular rotor position for smooth inverter field-oriented control" },
          { name: "High-Voltage Isolation Barrier Sensor", role: "Detects chassis leakage currents to prevent passenger electrocution risks" }
        ]
      },
      "chassis": {
        title: "Chassis, Electronic Stability & Braking",
        criticality: "Safety-Critical (ASIL-D)",
        protocol: "CAN Bus & Private Sensor Sub-bus",
        desc: "Provides instant feedback to prevent wheel skidding, correct oversteer/understeer, and maintain optimal tire inflation.",
        sensors: [
          { name: "Active Wheel Speed Hall Sensors", role: "Measures wheel rotation down to 0 km/h for Anti-lock Braking (ABS)" },
          { name: "Yaw-Rate & Lateral G MEMS IMU", role: "Detects vehicle skidding and fishtailing for Electronic Stability Control (ESC)" },
          { name: "Steering Angle Sensor (SAS)", role: "Measures driver steering input angle and angular velocity" },
          { name: "Direct TPMS RF Pressure Sensor", role: "Transmits real-time tire pressure & temp via 433 MHz RF to the BCM" }
        ]
      },
      "adas": {
        title: "ADAS & Autonomous Driving Perception Suite",
        criticality: "Safety-Critical (ASIL-D)",
        protocol: "Automotive Ethernet (1000BASE-T1)",
        desc: "A redundant multi-sensor perimeter providing 360-degree situational awareness in all weather conditions.",
        sensors: [
          { name: "77 GHz Long-Range Radar", role: "Penetrates heavy fog and rain for Adaptive Cruise Control & Auto Emergency Braking" },
          { name: "Solid-State LiDAR (905nm / 1550nm)", role: "Constructs dense millimeter-accurate 3D point cloud maps up to 250 meters" },
          { name: "Triple Forward CMOS Cameras", role: "Perceives color lane markings, traffic light states, and speed limit signs" },
          { name: "Ultrasonic Proximity Transducers", role: "Provides 3-meter blind spot and tight curb parking assistance in bumpers" }
        ]
      },
      "cabin": {
        title: "Cabin Safety & Environmental Comfort",
        criticality: "Comfort & Occupant Protection",
        protocol: "LIN Bus",
        desc: "Optimizes passenger safety staging, climate ergonomics, and hands-free automatic convenience.",
        sensors: [
          { name: "Capacitive Seat Occupant Sensor", role: "Detects passenger weight classification for multi-stage airbag deployment" },
          { name: "Optical Rain & Light Sensor (RLS)", role: "Infrared reflection detects windshield raindrops to actuate wipers automatically" },
          { name: "NDIR CO2 & Cabin Air Quality Sniffer", role: "Prevents driver drowsiness by auto-opening fresh air intake dampers" },
          { name: "Dual-Zone Solar Radiation Pyranometer", role: "Measures solar heating angle through windshield to adjust HVAC airflow" }
        ]
      }
    }
  },
  "aero": {
    name: "Commercial Jetliner (Airbus / Boeing)",
    subsystems: {
      "airdata": {
        title: "Air Data & Pitot-Static Suite",
        criticality: "Flight-Critical (DO-178C Level A)",
        protocol: "ARINC 429 Dual-Redundant Bus",
        desc: "Calculates the fundamental aerodynamic parameters necessary to keep the aircraft flying within its flight envelope.",
        sensors: [
          { name: "Electrically Heated Pitot Tubes", role: "Measures dynamic stagnation air pressure to compute Indicated Airspeed (IAS)" },
          { name: "Flush Static Pressure Ports", role: "Measures ambient atmospheric pressure to compute Barometric Pressure Altitude" },
          { name: "Angle-of-Attack (AoA) Vanes", role: "Vanes align with airflow to calculate wing stall margin and stick-shaker trigger" },
          { name: "Total Air Temperature (TAT) Platinum RTD", role: "Measures ram-air stagnation temperature to calculate True Airspeed (TAS) & Mach" }
        ]
      },
      "engines": {
        title: "High-Bypass Turbofan Engine Health (FADEC)",
        criticality: "Flight & Mission Critical",
        protocol: "Dual-Channel FADEC Digital Bus",
        desc: "Monitors thousands of horsepower spinning at extreme temperatures to prevent in-flight engine shutdowns.",
        sensors: [
          { name: "Exhaust Gas Temp (EGT) Thermocouples", role: "Nickel-alloy probes endure up to 1100°C gas blasts behind the turbine stages" },
          { name: "Piezoelectric Accelerometer Arrays", role: "Continuous vibration spectrum analysis on N1/N2 rotor bearing assemblies" },
          { name: "Magnetic Chip Oil Debris Detector", role: "Catches microscopic metallic flakes in engine lubrication lines to predict bearing spall" },
          { name: "Phonic Wheel Reluctance Speed Pickups", role: "Measures exact shaft RPM for turbine electronic fuel governor regulation" }
        ]
      },
      "navigation": {
        title: "Air Data Inertial Reference Unit (ADIRU)",
        criticality: "Flight-Critical",
        protocol: "ARINC 429 / MIL-STD-1553",
        desc: "Autonomous inertial guidance navigation independent of GPS satellites or ground beacons.",
        sensors: [
          { name: "Ring Laser Gyroscopes (RLG)", role: "Counter-propagating laser beams detect picoradian angular rotation drift" },
          { name: "Quartz Flexure Accelerometers", role: "Triple-redundant proof masses track linear displacement along all three axes" },
          { name: "Microwave Radar Altimeter", role: "Measures exact ground clearance height from 2,500 feet down to automated touchdown" }
        ]
      }
    }
  },
  "space": {
    name: "Low Earth Orbit (LEO) Satellite",
    subsystems: {
      "aocs": {
        title: "Attitude & Orbit Control System (AOCS)",
        criticality: "Mission-Critical (Loss of Satellite)",
        protocol: "SpaceWire / CAN Bus",
        desc: "Determines satellite orientation in space to point solar arrays toward the sun and payload antennas toward Earth.",
        sensors: [
          { name: "Autonomous Star Trackers", role: "Matches star constellation patterns against astronomical catalogs to arc-second precision" },
          { name: "Coarse Sun Sensors (CSS)", role: "Miniature solar cells on satellite facets for emergency 'safe-mode' sun acquisition" },
          { name: "Earth Horizon Infrared Bolometers", role: "Detects the Earth's CO2 atmospheric thermal boundary to identify local vertical" },
          { name: "3-Axis Fluxgate Magnetometer", role: "Measures Earth's magnetic field vectors to damp satellite tumbling via magnetorquers" }
        ]
      },
      "propulsion": {
        title: "Propulsion & Thermal Health Deck",
        criticality: "Mission-Critical",
        protocol: "SpaceWire / RS-422",
        desc: "Monitors cold-gas and hydrazine thruster systems for orbital station-keeping and de-orbit maneuvers.",
        sensors: [
          { name: "Radiation-Hardened Pressure Transducers", role: "Monitors propellant tank pressure drops to calculate remaining mission fuel delta-V" },
          { name: "Platinum RTD Thermal Sensors", role: "Monitors extreme -150°C to +120°C orbital eclipses to trigger survival heaters" },
          { name: "Reaction Wheel Hall Tachometers", role: "Measures flywheel spin speeds up to 6,000 RPM used for momentum-exchange steering" }
        ]
      },
      "payload": {
        title: "Scientific & Earth Observation Payload",
        criticality: "Payload Data Return",
        protocol: "High-Speed Serial Optical Interconnect",
        desc: "Performs optical imaging, synthetic aperture radar (SAR), or scientific radiation particle detection.",
        sensors: [
          { name: "Time-Delay Integration (TDI) CMOS Line Sensors", role: "Captures sub-meter resolution Earth imagery from 500 km orbital altitude" },
          { name: "Silicon Radiation Dosimeters", role: "Measures Total Ionizing Dose (TID) and solar flare cosmic ray events" }
        ]
      }
    }
  },
  "mobile": {
    name: "5G Smartphone & Wearable Tech",
    subsystems: {
      "interface": {
        title: "Display, Touch & Biometric Security",
        criticality: "User Security & Ergonomics",
        protocol: "MIPI DSI & High-Speed SPI",
        desc: "Translates human physical touch and biometrics into seamless, secure digital interaction.",
        sensors: [
          { name: "Projected Mutual-Capacitive Grid", role: "Tracks multiple simultaneous finger touch coordinates at 240 Hz sample rate" },
          { name: "Under-Display Ultrasonic Fingerprint Sensor", role: "Bounces high-frequency ultrasound through OLED glass to map 3D dermal ridges" },
          { name: "VCSEL 3D Dot Projector & IR Camera", role: "Projects 30,000 invisible infrared dots on human face for biometric Face Unlock" }
        ]
      },
      "spatial": {
        title: "Motion, Orientation & Indoor Navigation",
        criticality: "Navigation & Augmented Reality",
        protocol: "I3C / I2C Sensor Hub",
        desc: "Empowers step counting, screen auto-rotation, mobile gaming, and augmented reality camera tracking.",
        sensors: [
          { name: "Ultra-Low-Power 6-Axis MEMS IMU", role: "Continuously counts steps at micro-amp currents and rotates screen orientation" },
          { name: "3-Axis Digital Hall Magnetometer", role: "Provides true compass north heading for navigation maps and AR games" },
          { name: "Barometric Air Pressure Altimeter", role: "Measures 1 hPa atmospheric pressure shifts to detect which floor of a building you are on" }
        ]
      },
      "environment": {
        title: "Environmental Sensing & Power Safety",
        criticality: "Battery Health & Calling Ergonomics",
        protocol: "I2C Sensor Bus",
        desc: "Conserves battery life, protects hardware during fast-charging, and disables touchscreen during phone calls.",
        sensors: [
          { name: "Infrared Proximity Sensor", role: "Detects human ear proximity during calls to turn off the display and avoid accidental face touches" },
          { name: "Ambient Light Sensor (ALS)", role: "Matches screen brightness and color temperature to surrounding room lighting (True Tone)" },
          { name: "Dual Battery Pack NTC Thermistors", role: "Safeguards against thermal runaway during 65W+ fast-charging protocols" },
          { name: "Triple MEMS Microphones", role: "Beamforming arrays isolate speaker voice while cancelling background urban wind noise" }
        ]
      }
    }
  }
};

const dissectSysBtns = document.querySelectorAll(".dissect-sys-btn");
const subsystemMenu = document.querySelector("#subsystem-menu");
const dissectTitle = document.querySelector("#dissect-title");
const dissectCrit = document.querySelector("#dissect-crit");
const dissectProtocol = document.querySelector("#dissect-protocol");
const dissectDesc = document.querySelector("#dissect-desc");
const dissectSensorsTable = document.querySelector("#dissect-sensors-table");

let currentSystem = "auto";
let currentSubsystem = "powertrain";

const renderDissectDetail = () => {
  const sysData = dissectData[currentSystem];
  if(!sysData) return;
  const subData = sysData.subsystems[currentSubsystem];
  if(!subData) return;

  if(dissectTitle) dissectTitle.textContent = subData.title;
  if(dissectCrit) {
    dissectCrit.textContent = subData.criticality;
    dissectCrit.className = `crit-badge ${subData.criticality.includes("Safety") || subData.criticality.includes("Flight") ? "crit-safety" : subData.criticality.includes("Mission") ? "crit-mission" : "crit-comfort"}`;
  }
  if(dissectProtocol) dissectProtocol.textContent = subData.protocol;
  if(dissectDesc) dissectDesc.textContent = subData.desc;

  if(dissectSensorsTable){
    dissectSensorsTable.innerHTML = "";
    subData.sensors.forEach(s=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><strong>${s.name}</strong></td><td>${s.role}</td>`;
      dissectSensorsTable.appendChild(tr);
    });
  }
};

const renderSubsystemMenu = () => {
  if(!subsystemMenu) return;
  subsystemMenu.innerHTML = "";
  const sysData = dissectData[currentSystem];
  if(!sysData) return;

  const subKeys = Object.keys(sysData.subsystems);
  if(!subKeys.includes(currentSubsystem)){
    currentSubsystem = subKeys[0];
  }

  subKeys.forEach(k=>{
    const sub = sysData.subsystems[k];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `subsystem-btn ${k === currentSubsystem ? "active" : ""}`;
    btn.innerHTML = `<span>${sub.title}</span> <i class="fa-solid fa-chevron-right"></i>`;
    btn.addEventListener("click",()=>{
      subsystemMenu.querySelectorAll(".subsystem-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      currentSubsystem = k;
      renderDissectDetail();
    });
    subsystemMenu.appendChild(btn);
  });

  renderDissectDetail();
};

if(dissectSysBtns.length > 0){
  dissectSysBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      dissectSysBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      currentSystem = btn.dataset.system;
      renderSubsystemMenu();
    });
  });
  renderSubsystemMenu();
}

