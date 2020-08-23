<?php

namespace App\Controller;

use App\Entity\BlacklistedPlayer;
use App\Entity\Reason;
use App\Repository\BlacklistedPlayerRepository;
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
     * @param BlacklistedPlayerRepository $blacklistedPlayerRepository
     * @param Request $request
     * @return JsonResponse
     */
    public function newPlayer(
        BlacklistedPlayerRepository $blacklistedPlayerRepository,
        Request $request
    ): JsonResponse
    {
        $data = $request->request->get('player');
        $player = new BlacklistedPlayer();
        $player->setName($data['name']);
        $player->setCreatedAt(new \DateTimeImmutable());
        foreach ($data['reasons'] as $reasonName){
            $reason = new Reason();
            $reason->setLabel($reasonName);
            $player->addReason($reason);
        }
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($player);
        $manager->flush();
        return new JsonResponse($player->serialize());
    }
}
