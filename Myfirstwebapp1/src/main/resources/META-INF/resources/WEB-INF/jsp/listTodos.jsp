<%@ include file ="common/header.jspf" %>
<%@ include file ="common/navigation.jspf" %>
	<div class="container">
	<div>Welcome ${name}</div>
		<h1>todos</h1>
		<table class="table">
			<thead>
			<tr>
				<th>id<th>
				<th>Description</th>
				<th>Target Date</th>
				<th>IS Done?</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
				<c:forEach items="${todos}" var="todo">
				<tr>
				<td>${todo.id}</td>
				<td>${todo.description}</td>
				<td>${todo.targetDate}</td>
				<td>${todo.done}</td>
				<td> <a href="delete-todo?id=${todo.id}" class="btn btn-warning">DELETE ${todo.id}</a> </td>
				<td> <a href="update-todo?id=${todo.id}" class="btn btn-success">update ${todo.id}</a> </td>
				</tr>
				</c:forEach>
			<tbody>
	</table>
		<a href="add-todo" class="btn btn-success">Add todo</a>
	</div>
	<%@ include file ="common/footer.jspf" %>