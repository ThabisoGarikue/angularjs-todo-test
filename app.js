angular.module('todoApp', [])
.controller('TodoController', ['$scope', '$http', function($scope, $http) { 
    var apiBaseUrl = 'https://localhost:7201'; 

    // Initialize the todos array
    $scope.todos = [];

    // Initialize the new todo input
    $scope.newTodo = '';

    $scope.fetchTodos = function() {
        $http.get(apiBaseUrl + '/api/Todo')
            .then(function(response) {
                $scope.todos = response.data.map(function(todoItem) {
                    return {
                        id: todoItem.id,           
                        text: todoItem.item,
                        completed: false 
                    };
                });
            })
            .catch(function(error) {
                console.error('Error fetching items', error);
            });
    };

    $scope.fetchTodos();

    // Function to add a new todo
    $scope.addTodo = function() {
        // TODO - Implement functionality to add a new todo
        if ($scope.newTodo && $scope.newTodo.trim() !== '') {
            var itemContent = $scope.newTodo.trim();

            $http.post(apiBaseUrl + '/api/Todo', JSON.stringify(itemContent), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log('Todo added successfully:', response.data);

                $scope.todos.push({
                    id: response.data.id,           
                    text: response.data.item,       
                    completed: false                
                });

                // Clear the input field after successful addition
                $scope.newTodo = '';
            })
            .catch(function(error) {
                console.error('Error adding item:', error);
            });
        }
    };

    $scope.removeTodo = function(todoItemToRemove) { 
        // TODO - Implement functionality to remove a todo by index
        if (todoItemToRemove && todoItemToRemove.id !== undefined) {
            $http.delete(apiBaseUrl + '/api/Todo/' + todoItemToRemove.id) 
                .then(function(response) {
                    console.log('Todo removed successfully from backend. ID:', todoItemToRemove.id);

                    $scope.todos = $scope.todos.filter(function(todo) {
                        return todo.id !== todoItemToRemove.id; 
                    });
                })
                .catch(function(error) {
                    console.error('Error removing todo from backend:', error);
                });
        }
    };

    // Function to get the count of completed todos
    $scope.getCompletedCount = function() {
        return $scope.todos.filter(function(todo) {
            return todo.completed;
        }).length;
    };

    // Function to get the count of remaining (incomplete) todos
    $scope.getRemainingCount = function() {
        return $scope.todos.filter(function(todo) {
            return !todo.completed;
        }).length;
    };

    // Function to toggle all todos completion status
    $scope.toggleAll = function() {
        var allCompleted = $scope.todos.every(function(todo) {
            return todo.completed;
        });

        $scope.todos.forEach(function(todo) {
            todo.completed = !allCompleted;
        });
    };

    // Function to clear all completed todos
    $scope.clearCompleted = function() {
        $scope.todos = $scope.todos.filter(function(todo) {
            return !todo.completed;
        });
    };
}]);