<?php

/*
 * This file is part of askvortsov/flarum-checklist.
 *
 * Copyright (c) 2021 Alexander Skvortsov.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Askvortsov\FlarumChecklist;

use Flarum\Extend;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->TaskLists;
        }),
];
