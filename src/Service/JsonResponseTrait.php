<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonResponseTrait
 * @package App\Service
 */
trait JsonResponseTrait
{
    /**
     * @param $content
     * @return JsonResponse
     */
    public function formattedJsonResponse($content){
        return new JsonResponse([
            'success' => true,
            'content' => $content
        ]);
    }

    /**
     * @param $message
     * @return JsonResponse
     */
    public function formattedErrorJsonResponse($message){
        return new JsonResponse([
            'success' => false,
            'message' => $message
        ]);
    }
}