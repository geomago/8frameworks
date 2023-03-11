$(document).ready(function() {
	$.getJSON("https://dummyjson.com/products", function(data) {
	  var products = data.products;
	  var productTable = $("#productTable tbody");
	  for (var i = 0; i < products.length; i++) {
		var product = products[i];
		var row = "<tr data-id='" + product.id + "'>" +
					"<td>" + product.id + "</td>" +
					"<td>" + product.title + "</td>" +
					"<td>" + product.description + "</td>" +
					"<td>" + product.price + "</td>" +
					"<td><img src='" + product.thumbnail + "' alt='" + product.title + "'></td>" +
					"<td><button class='btn btn-primary editButton'>Edit</button></td>" +
				  "</tr>";
		productTable.append(row);
	  }
	}).fail(function() {
	  alert("Failed to fetch product data.");
	});
  
	$("#productTable").on("click", ".editButton", function() {
	  var row = $(this).closest("tr");
	  var id = row.data("id");
	  var title = row.find("td:eq(1)").text();
	  var description = row.find("td:eq(2)").text();
	  var price = row.find("td:eq(3)").text();
  
	  $("#titleInput").val(title);
	  $("#descriptionInput").val(description);
	  $("#priceInput").val(price);
  
	  $("#editModal").modal("show");
  
	  $("#saveChangesButton").off("click").on("click", function() {
		var newTitle = $("#titleInput").val();
		var newDescription = $("#descriptionInput").val();
		var newPrice = $("#priceInput").val();
  
		row.find("td:eq(1)").text(newTitle);
		row.find("td:eq(2)").text(newDescription);
		row.find("td:eq(3)").text(newPrice);
  
		$("#editModal").modal("hide");
	  });
	});
  });
  