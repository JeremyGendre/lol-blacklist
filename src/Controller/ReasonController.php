<?php

namespace App\Controller;

use App\Entity\Reason;
use App\Repository\ReasonRepository;
use App\Service\JsonResponseTrait;
use App\Service\ReasonHelper;
use App\Service\RequestTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ReasonController
 * @package App\Controller
 * @Route("/api/reason")
 */
class ReasonController extends AbstractController
{
    use JsonResponseTrait;
    use RequestTrait;

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

    /**
     * @Route("/new", name="new_reason", methods={"POST"})
     * @param Request $request
     * @param ReasonHelper $reasonHelper
     * @return JsonResponse
     */
    public function createReason(
        Request $request,
        ReasonHelper $reasonHelper
    ):JsonResponse{
        $data = $this->handlePostRequest($request);
        if($reasonHelper->checkLabelUniqueness($data->label)){
            return $this->formattedErrorJsonResponse("The label '". $data->label ."' already exists");
        }
        $manager = $this->getDoctrine()->getManager();
        $reason = new Reason();
        $reason->setLabel($data->label);
        $manager->persist($reason);
        $manager->flush();
        return $this->formattedJsonResponse($reason->serialize());
    }

    /**
     * @Route("/delete/{id}", name="delete_reason", methods={"DELETE"})
     * @param Reason $reason
     * @return JsonResponse
     */
    public function deleteReason(Reason $reason){
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($reason);
        $manager->flush();
        return $this->formattedJsonResponse("Reason successfully deleted");
    }
}
