import 'package:flutter/material.dart';
import 'package:flutter_fwf/pages/credits.dart';
import 'package:flutter_fwf/pages/game.dart';

List<Widget> pages = [Game(), Credits()];

class NavBarWidget extends StatefulWidget {
  const NavBarWidget({super.key});

  @override
  State<NavBarWidget> createState() => _NavBarWidgetState();
}

class _NavBarWidgetState extends State<NavBarWidget> {
  int currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      destinations: [
        NavigationDestination(icon: Icon(Icons.games_outlined), label: 'Game'),
        NavigationDestination(
          icon: Icon(Icons.copyright_rounded),
          label: 'Credits',
        ),
      ],
      onDestinationSelected: (int value) {
          setState(() {
            currentIndex = value;
          });
        },
        selectedIndex: currentIndex,
      
    );
  }
}
