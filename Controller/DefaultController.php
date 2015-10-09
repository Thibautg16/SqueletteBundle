<?php

namespace Thibautg16\SqueletteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('Thibautg16SqueletteBundle:Default:index.html.twig', array('name' => $name));
    }
}
