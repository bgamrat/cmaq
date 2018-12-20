$("#go").on("click", function () {
    var calculatorDuration = (Math.random() * 5) * 1000;
    $("#loading").addClass("calculating");
    $("#bike").addClass("hidden").removeClass("bike");
    $("#bike-lane").addClass("hidden");
    window.setTimeout(function () {
        var dataOkay = 0;
        var result = "Current\n--------\n";
        var computation, current;
        var label, labels = document.querySelectorAll("label");
        var i, l = labels.length;
        var value, attr, proposed = false;
        for( i = 0; i < l; i++ ) {
            label = $(labels[i]);
            attr = label.attr("data-proposed");
            value = $("#" + label.attr("for")).val().trim();
            if( value !== "" ) {
                if( typeof attr !== "undefined" && attr !== false && attr !== null && proposed === false ) {
                    result += "\nProposed\n--------\n";
                    proposed = true;
                }
                result += label.text() + ": ";
                if( isNaN(value) ) {
                    result += "Invalid data submitted, ignored";
                } else {
                    result += value;
                    dataOkay++;
                }
                result += "\n";
            }
        }
        if( dataOkay >= 5 ) {
            result += "\nEmissions\n";
            current = (Math.random() * 1000).toFixed(2);
            computation = "Current: " + current;
            result += "=".repeat(computation.length) + "\n" + computation + "\n\n";
            computation = "Expected reduction: " + (Math.random() * current).toFixed(2);
            result += "=".repeat(computation.length) + "\n" + computation + "\n";
            $("#bike").removeClass("hidden").addClass("bike");
            $("#bike-lane").removeClass("hidden");
        } else {
            result = "Unable to estimate emissions, incomplete or invalid data submitted\n" +
                    "I need at least five numbers to calculate\n" +
                    "You should probably plan for a bike lane anyway";
        }
        $("#loading").removeClass("calculating");
        $("#data-entry").collapse("hide");
        $("#calculations").text(result);
        $("#results-display").collapse("show");
    }, calculatorDuration);
});