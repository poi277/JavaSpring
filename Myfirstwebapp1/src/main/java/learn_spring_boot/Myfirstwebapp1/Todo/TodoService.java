package learn_spring_boot.Myfirstwebapp1.Todo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class TodoService {

	private static List<Todo> todos = new ArrayList<>();

	private static int todosCount = 0;

	static {
		todos.add(new Todo(++todosCount, "poi", "asd1", LocalDate.now().plusYears(1), false));
		todos.add(new Todo(++todosCount, "poi", "asd2", LocalDate.now().plusYears(2), false));
		todos.add(new Todo(++todosCount, "poi", "asd3", LocalDate.now().plusYears(3), false));
	}

	public List<Todo> findByUsername(String username) {
		Predicate<? super Todo> predicate = todo -> todo.getUsername().equalsIgnoreCase(username);
		return todos.stream().filter(predicate).toList();

	}

	public void addTodo(String username, String description, LocalDate targetDate, boolean isDone) {
		Todo todo = new Todo(++todosCount, username, description, targetDate, isDone);
		todos.add(todo);
	}

	public void deleteById(int id) {
		// TODO Auto-generated method stub
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		todos.removeIf(predicate);
	}

	public Todo findbyId(int id) {
	Predicate<? super Todo> predicate = todo -> todo.getId() == id;
	Todo todo = todos.stream().filter(predicate).findFirst().get();
	return todo;
	}

	public void updateTodo(@Valid Todo todo) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		deleteById(todo.getId());
		todos.add(todo);
	}
}

//	public void updateTodo(@Valid Todo todo) {
//		// TODO Auto-generated method stub
//		deleteById(todo.getId());
//		todos.add(todo);
//	}
//
//	public void addTodo(String username,String description, LocalDate targetDate,boolean isDone)
//	{
//		Todo todo = new Todo(++todosCount,username,description,targetDate,isDone);
//		todos.add(todo);
//	}
//
//	public void deleteById(int id) {
//		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
//		todos.removeIf(predicate);
//	}

//	public Todo findbyId(int id) {
//		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
//		Todo todo = todos.stream().filter(predicate).findFirst().get();
//		return todos;
//	}
//	public void updateTodo(@Valid Todo todo) {
//		// TODO Auto-generated method stub
//		deleteById(todo.getId());
//		todos.add(todo);
//	}
//}
//
