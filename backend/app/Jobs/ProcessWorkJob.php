<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Work;
use Storage;

class ProcessWorkJob implements ShouldQueue
   {
       use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

       protected $work;

       public function __construct(Work $work)
       {
           $this->work = $work;
       }

       public function handle()
       {
           // Здесь вы можете сохранить ваш файл и выполнить другие действия
           $file = $this->work->file;
           $path = $this->work->path;
           // Пример сохранения файла
           Storage::disk('work')->put($path, file_get_contents($file));

           // Можете выполнить другие действия с сохраненным файлом. Например, обновить базу данных или отправить уведомление

           // Не забудьте добавить необходимые зависимости (use) и имплементировать методы
       }
   }
