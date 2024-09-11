$(document).ready(function () {
  if ($(".carousel").length > 0) {
    $(".carousel").slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 1500,
      adaptiveHeight: true,
      prevArrow: $(".custom-prev-arrow"),
      nextArrow: $(".custom-next-arrow"),
      responsive: [
        {
          breakpoint: 1200, // For screens smaller than 1200px
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 992, // For screens smaller than 992px
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768, // For screens smaller than 768px
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }

  $(".view-course").on("click", function (e) {
    e.preventDefault();

    var pdfUrl = $(this).data("pdf-url");

    // Check if on mobile
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(pdfUrl, "_blank");
    } else {
      // Set the PDF URL in the iframe
      $("#pdfIframe").attr("src", pdfUrl);

      // Show the modal
      $("#pdfModal")[0].showModal();
    }
  });

  $(".close-modal").on("click", function () {
    $("#pdfIframe").attr("src", "");

    $("#pdfModal")[0].close();
  });

  $("#contact-form").on("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    console.log("kkk");

    // Collect the form data
    var formData = {
      fullName: $("#full-name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    // Send the form data via AJAX
    $.ajax({
      //   url: "https://your-api-endpoint.com/send-message",
      url: "https://ashiqpradeep.com/api/v1/contact",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        toastr.success(response?.message);

        $("#contactForm")[0].reset();
      },
      error: function (err) {
        var errorMessage = "An error occurred. Please try again.";

        if (err.responseJSON && err.responseJSON.message) {
          errorMessage = err.responseJSON.message;
        } else if (err.responseText) {
          try {
            var response = JSON.parse(err.responseText);
            if (response.message) {
              errorMessage = response.message;
            }
          } catch (e) {
            console.log("Error parsing responseText:", e);
          }
        }

        toastr.error(errorMessage);
      },
    });
  });

  $("[aria-label='whats-new-img'").on("click", function (e) {
    e.preventDefault();
    var imgUrl = $(this).data("src");

    $("#modal-image").attr("src", imgUrl);
    $("#image-dialog")[0].showModal();
  });

  $("#image-dialog-close-btn").on("click", function () {
    $("#modal-image").attr("src", "");

    $("#image-dialog")[0].close();
  });
});
