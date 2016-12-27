function ajaxGet(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  return Promise.resolve(
    $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      headers
    })
  )
}

window.setInterval(function(){

  ajaxGet("/ajax/csalad/egyenleg")
    .then(data => {
      $("#csaladi-egyenleg").text(data["csaladEgyenleg"]);
    })
    .catch(xhr => {
      $('.help-block').text(xhr.responseText)
    })

}, 5000);
