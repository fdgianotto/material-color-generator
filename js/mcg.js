document.addEventListener('DOMContentLoaded', function () {
    var
        inputGenerate = document.querySelector('#input-generate'),
        tintIcon = document.querySelector('#tintIcon'),
        baseIcon = document.querySelector('#baseIcon'),
        shadeIcon = document.querySelector('#shadeIcon'),
        tintBox = document.querySelector('#tintBox'),
        baseBox = document.querySelector('#baseBox'),
        shadeBox = document.querySelector('#shadeBox'),
        tintDetail = document.querySelector('#tintDetail'),
        baseDetail = document.querySelector('#baseDetail'),
        shadeDetail = document.querySelector('#shadeDetail'),
        tintHEX = document.querySelector('#tintHEX'),
        baseHEX = document.querySelector('#baseHEX'),
        shadeHEX = document.querySelector('#shadeHEX'),
        tintRGB = document.querySelector('#tintRGB'),
        baseRGB = document.querySelector('#baseRGB'),
        shadeRGB = document.querySelector('#shadeRGB'),
        illustratorOutput = document.querySelector('#illustrator-output'),
        steps = 3,
        firstRun = 1,
        chromaColor, userColor, colorList, selectedIcon, selectedBox, selectedDetail, selectedHEX, selectedRGB;

    generate();

    // Enable tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    inputGenerate.addEventListener('keyup', generate);

    function generate() {
        // Reinitialize the color list
        colorList = [];

        // Get the color value
        if (firstRun == 0) {
            userColor = inputGenerate.value;
        } else {
            userColor = 'e23b3b'
            inputGenerate.placeholder = userColor
            firstRun = 0
        }

        // Remove hash from color
        if (userColor[1] = '#') {
            userColor = userColor.replace('#', '');
        }

        if (userColor.length > 5) {

            // Reset Illustrator Output field
            illustratorOutput.value = '';

            // Initialize Chroma
            chromaColor = chroma(userColor);

            // Create color scheme
            for (var i = 0; i < steps; i++) {
                colorList[i] = chromaColor.darken(i - Math.floor(steps / 2));
            }

            // Assign color to elements
            for (var j = 0; j < colorList.length; j++) {

                // Select elements according to the color
                if (j == 0) {
                    selectedIcon = tintIcon
                    selectedBox = tintBox
                    selectedDetail = tintDetail
                    selectedHEX = tintHEX
                    selectedRGB = tintRGB
                } else if (j == 1) {
                    selectedIcon = baseIcon
                    selectedBox = baseBox
                    selectedDetail = baseDetail
                    selectedHEX = baseHEX
                    selectedRGB = baseRGB
                } else {
                    selectedIcon = shadeIcon
                    selectedBox = shadeBox
                    selectedDetail = shadeDetail
                    selectedHEX = shadeHEX
                    selectedRGB = shadeRGB
                }

                // Assign colors to icons inside color box
                if (chroma(colorList[j]).luminance() >= 0.5) {
                    selectedIcon.style.fill = colorList[j].darken(2)
                } else {
                    selectedIcon.style.fill = colorList[j].brighten(2)
                }

                // Assign colors to texts inside detail box
                if (chroma(colorList[j]).darken(1).luminance() >= 0.5) {
                    selectedHEX.style.color = colorList[j].darken(1).darken(2)
                    selectedRGB.style.color = colorList[j].darken(1).darken(2)
                } else {
                    selectedHEX.style.color = colorList[j].darken(1).brighten(2)
                    selectedRGB.style.color = colorList[j].darken(1).brighten(2)
                }

                // Set color box background color
                selectedBox.style.backgroundColor = colorList[j]

                // Set detail box background color
                selectedDetail.style.backgroundColor = colorList[j].darken(1)

                // Print color HEX code
                selectedHEX.innerHTML = colorList[j]

                // Print color RGB code
                selectedRGB.innerHTML = chroma(colorList[j]).css()

                // Generate output to be worked with Adobe Illustrator Script
                illustratorOutput.value = illustratorOutput.value + colorList[j];
            }
        }

        // Remove every # character from Adobe Illustrator output
        illustratorOutput.value = illustratorOutput.value.replace(/#/g, "")
    }
});

