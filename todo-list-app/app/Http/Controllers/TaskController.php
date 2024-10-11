<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Simple task controller for handling basic CRUD ops on tasks.
 */
class TaskController extends Controller
{
    use AuthorizesRequests;

    /**
     * This endpoint will allow users to view their tasks and routes to the tasks.index view
     * or returns a JSON response containing user tasks depending on the request type.
     * ( normally, this would be separated out into different controllers, but keeping it simple for this example )
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $tasks = Auth::user()->tasks ?? [];

        if ($request->expectsJson()) {
            $taskResponse = [
                'data' => $tasks,
            ];
            return response()->json($taskResponse);
        }

        return view('tasks.index');
    }

    public function store(Request $request)
    {
        // Inline validation here instead of using a FormRequest class for simplicity
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task = Auth::user()->tasks()->create($request->only(['title', 'description', 'due_date']));

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $task->update($request->only(['title', 'description', 'completed']));

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([], 204);
    }
}
