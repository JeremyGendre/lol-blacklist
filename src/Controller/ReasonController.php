<?php

namespace App\Controller;

use App\Repository\ReasonRepository;
use App\Service\JsonResponseTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ReasonController
 * @package App\Controller
 * @Route("/api/reason")
 */
class ReasonController extends AbstractController
{
    use JsonResponseTrait;

    /**
     * @Route("/all", name="all_reasons", methods={"GET"})
     * @param ReasonRepository $reasonRepository
     * @return JsonResponse
     */
    public function allPlayers(
        ReasonRepository $reasonRepository
    ): JsonResponse
    {
        $list = $reasonRepository->findAll();
        $returnedList = [];
        foreach ($list as $reason){
            $returnedList[] = [
                'key' => $reason->getId(),
                'value' => $reason->getId(),
                'text' => $reason->getLabel(),
            ];
        }
        return $this->formattedJsonResponse($returnedList);
    }
}
