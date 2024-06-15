function calculateBMI() {
    const height = parseFloat($('#height').val());
    const weight = parseFloat($('#weight').val());
    const heightUnit = $('#height-unit').val();
    const weightUnit = $('#weight-unit').val();

    if (!height || !weight) {
        $('#bmi-value').text('').removeClass('valid-result');
        $('#bmi-status').text('');
        $('#recommendations').html('');
        if (!height) {
            $('#height').addClass('missing-data');
        }
        if (!weight) {
            $('#weight').addClass('missing-data');
        }
        return;
    }

    let heightInMeters = height;
    if (heightUnit === 'cm') {
        heightInMeters = height / 100;
    } else if (heightUnit === 'in') {
        heightInMeters = height * 0.0254;
    }

    let weightInKg = weight;
    if (weightUnit === 'lb') {
        weightInKg = weight * 0.453592;
    }

    const bmi = weightInKg / (heightInMeters ** 2);
    const roundedBmi = bmi.toFixed(1);

    let status = '';
    let color = '';
    let recommendations = '';

    if (bmi < 16) {
        status = 'Severely underweight';
        color = 'red';
        recommendations = getRecommendations('gain');
    } else if (bmi >= 16 && bmi < 18.5) {
        status = 'Underweight';
        color = 'red';
        recommendations = getRecommendations('gain');
    } else if (bmi >= 18.5 && bmi < 25) {
        status = 'Normal';
        color = 'green';
        recommendations = getRecommendations('maintain');
    } else if (bmi >= 25 && bmi < 30) {
        status = 'Overweight';
        color = 'yellow';
        recommendations = getRecommendations('lose');
    } else if (bmi >= 30 && bmi < 35) {
        status = 'Obesity I';
        color = 'red';
        recommendations = getRecommendations('lose');
    } else if (bmi >= 35 && bmi < 40) {
        status = 'Obesity II';
        color = 'red';
        recommendations = getRecommendations('lose');
    } else {
        status = 'Obesity III';
        color = 'red';
        recommendations = getRecommendations('lose');
    }

    $('#bmi-value').text(roundedBmi).css('color', color).addClass('valid-result');
    $('#bmi-status').text(status).css('color', color);
    $('#recommendations').html(recommendations).hide().fadeIn('slow');

    $('html, body').animate({
        scrollTop: $(".result").offset().top
    }, 1000);
}

function getRecommendations(type) {
    if (type === 'gain') {
        return `
            <h3>Recommendations for Gaining Weight</h3>
            <p><strong>Diet:</strong> Include high-calorie foods like nuts, dried fruits, and healthy fats such as avocados and olive oil.</p>
            <p><strong>Exercise:</strong> Focus on strength training exercises to build muscle mass. Include exercises like weight lifting and resistance training.</p>
        `;
    } else if (type === 'lose') {
        return `
            <h3>Recommendations for Losing Weight</h3>
            <p><strong>Diet:</strong> Opt for lighter meals with plenty of vegetables, lean proteins, and whole grains. Avoid sugary and high-fat foods.</p>
            <p><strong>Exercise:</strong> Incorporate cardio exercises such as running, cycling, or swimming to burn calories.</p>
        `;
    } else if (type === 'maintain') {
        return `
            <h3>Congratulations!</h3>
            <p>You are at a healthy weight. To maintain your weight:</p>
            <p><strong>Diet:</strong> Continue to eat a balanced diet with a variety of nutrients. Ensure your meals include fruits, vegetables, whole grains, and lean proteins.</p>
            <p><strong>Exercise:</strong> Maintain a regular exercise routine, combining both cardio and strength training exercises.</p>
        `;
    }
    return '';
}

$(document).ready(function(){
    $('#height, #weight').on('input', function() {
        $(this).removeClass('missing-data');
    });
});