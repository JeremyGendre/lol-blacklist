<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

/**
 * Trait RequestTrait
 * @package App\Service
 */
trait RequestTrait
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function handlePostRequest(Request $request){
        return json_decode($request->getContent());
    }
}