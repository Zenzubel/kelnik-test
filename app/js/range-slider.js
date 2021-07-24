const sliderCount = document.getElementById('slider-count');
const sliderMeasure = document.getElementById('slider-measure');

if (sliderCount) {
    noUiSlider.create(sliderCount, {
        start: [5500000, 18900000],
        connect: true,
        step: 1000,
        range: {
            'min': [0],
            'max': [50000000]
        }
    });

    const input0 = document.getElementById('input-count-0');
    const input1 = document.getElementById('input-count-1');

    setValue(sliderCount, input0, input1);
}

if (sliderMeasure) {
    noUiSlider.create(sliderMeasure, {
        start: [33, 123],
        connect: true,
        step: 1,
        range: {
            'min': [0],
            'max': [250]
        }
    });

    const input0 = document.getElementById('input-measure-0');
    const input1 = document.getElementById('input-measure-1');

    setValue(sliderMeasure, input0, input1);
}

function setValue(slider, input0, input1) {
    const inputs = [input0, input1];

    slider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = Math.round(values[handle]);
    });

    function setRangeSlider(i , value) {
        const arr = [null, null];
        arr[i] = value;

        slider.noUiSlider.set(arr);
    }

    inputs.forEach((el, index)=> {
        el.addEventListener('change', (e)=> {
            setRangeSlider(index, e.currentTarget.value);
        });
    });
}

const setDefault = document.getElementById('set-default');
    if (setDefault) {
        setDefault.addEventListener('click', (el)=> {
            sliderMeasure.noUiSlider.set([33, 123]);
            sliderCount.noUiSlider.set([5500000, 18900000]);
        });
    }