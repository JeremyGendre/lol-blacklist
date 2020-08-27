<?php

namespace App\Repository;

use App\Entity\BlacklistedPlayer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method BlacklistedPlayer|null find($id, $lockMode = null, $lockVersion = null)
 * @method BlacklistedPlayer|null findOneBy(array $criteria, array $orderBy = null)
 * @method BlacklistedPlayer[]    findAll()
 * @method BlacklistedPlayer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlacklistedPlayerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BlacklistedPlayer::class);
    }

    public function findByName($name)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.name = :val')
            ->setParameter('val', $name)
            ->getQuery()
            ->getResult()
            ;
    }

    // /**
    //  * @return BlacklistedPlayer[] Returns an array of BlacklistedPlayer objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BlacklistedPlayer
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
