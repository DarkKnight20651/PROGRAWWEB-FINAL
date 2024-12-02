<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\CourseUser;

class CourseUserController extends Controller
{
        public function getCourseUsers()
        {
            $users = CourseUser::select('user_id')->get();
            return response()->json($users, 200);
        }
}
