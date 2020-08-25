<?php

namespace App\Controller;

use App\Entity\BlacklistedPlayer;
use App\Entity\Reason;
use App\Repository\BlacklistedPlayerRepository;
use App\Repository\ReasonRepository;
use App\Service\ReasonHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlacklistedPlayerController
 * @package App\Controller
 * @Route("/api/player")
 */
class BlacklistedPlayerController extends AbstractController
{
    /**
     * @Route("/all", name="all_players", methods={"GET"})
     * @param BlacklistedPlayerRepository $blacklistedPlayerRepository
     * @return JsonResponse
     */
    public function allPlayers(
        BlacklistedPlayerRepository $blacklistedPlayerRepository
    ): JsonResponse
    {
        $list = $blacklistedPlayerRepository->findAll();
        $returnedList = [];
        foreach ($list as $player){
            $returnedList[] = $player->serialize();
        }
        return new JsonResponse($returnedList);
    }

    /**
     * @Route("/new", name="new_player", methods={"POST"})
     * @param Request $request
     * @param ReasonRepository $reasonRepository
     * @param ReasonHelper $reasonHelper
     * @return JsonResponse
     */
    public function newPlayer(
        Request $request,
        ReasonRepository $reasonRepository,
        ReasonHelper $reasonHelper
    ): JsonResponse
    {
        $manager = $this->getDoctrine()->getManager();
        $data = $request->request->get('player');
        $player = new BlacklistedPlayer();
        $player->setName($data['name']);
        $player->setCreatedAt(new \DateTimeImmutable());
        foreach ($data['reasons'] as $reasonId){
            $reason = $reasonRepository->findOneBy(['id'=>$reasonId]);
            if($reason !== null){
                $player->addReason($reason);
            }
        }
        if($player->getReasons()->count()){
            $reason = $reasonHelper->findOrCreateDefaultReason(Reason::DEFAULT_REASON_LABEL);
            $player->addReason($reason);
        }

        $manager->persist($player);
        $manager->flush();
        return new JsonResponse($player->serialize());
    }
}
